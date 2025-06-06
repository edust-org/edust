"use client"

import { useGetOrgLists, usePostOrganization } from "@/hooks/react-query"
import { convertSlug } from "@/utils"
import { OrganizationRoles } from "@edust/types"
import { Checkbox } from "@edust/ui"
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@edust/ui"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { BarLoader } from "react-spinners"
import { toast } from "sonner"
import { z } from "zod"

import { useEffect } from "react"

const FormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Name is required" })
    .max(100, { message: "Name must not exceed 100 characters" }),
  orgUsername: z
    .string()
    .trim()
    .min(1, { message: "Organization username is required" })
    .regex(/^[a-zA-Z0-9_-]+$/, {
      message:
        "Organization username can only contain letters, numbers, underscores, and hyphens",
    })
    .max(100, {
      message: "Organization username must not exceed 100 characters",
    }),
  isAccepted: z.boolean(),
})

export const CreateOrganizationForm = () => {
  const { status, update } = useSession()

  const { refetch } = useGetOrgLists()
  const router = useRouter()
  const { mutateAsync: postOrganization, isPending: isLoading } =
    usePostOrganization()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      orgUsername: "",
      isAccepted: false,
    },
  })

  const nameValue = form.watch("name")
  useEffect(() => {
    if (nameValue) {
      // Generate slug from the name by converting it to lowercase and replacing spaces with hyphens
      const orgUsername = convertSlug(nameValue)

      // Update the slug field in the form state
      form.setValue("orgUsername", orgUsername)
    }
  }, [nameValue, form.setValue, form])

  function onSubmit(data: z.infer<typeof FormSchema>) {
    if (status !== "authenticated") {
      return toast.error("Please login or create your account!")
    }

    const payload = { name: data.name, orgUsername: data.orgUsername }

    postOrganization(payload)
      .then((res) => {
        toast.success(res.message)
        if (res.data.role.id) {
          const organizationRoles: OrganizationRoles[] = [
            {
              id: res.data.role.id,
              role: res.data.role.name,
              organization: {
                id: res.data.id,
                name: res.data.name,
                orgUsername: res.data.orgUsername,
                createdAt: res.data.createdAt,
                updatedAt: res.data.updatedAt,
              },
            },
          ]

          update({ organizationRoles })
        }
        refetch()
          .then(() => router.push("/"))
          .catch(() => router.push("/"))
      })
      .catch((error) => {
        if (error?.data?.status) {
          toast.error(error?.data?.message)
        }
      })
  }
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Organization Name</FormLabel>
                <FormControl>
                  <Input placeholder="name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="orgUsername"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Organization Unique orgUsername</FormLabel>
                <FormControl>
                  <Input placeholder="orgUsername" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isAccepted"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Accept terms and conditions</FormLabel>
                </div>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full"
            disabled={!form.watch("isAccepted")}
          >
            {isLoading ? <BarLoader color="#fff" /> : "Create an organization"}
          </Button>
        </form>
      </Form>
    </>
  )
}
