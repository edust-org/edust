import { accessControlHooks } from "@/hooks/react-query"
import { useAuthStore } from "@/store"
import { asOptionalField } from "@/utils"
import {
  Button,
  Card,
  CardContent,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@edust/ui"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { useEffect, useRef } from "react"

const FormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, { message: "Name must be at least 3 characters long" })
    .refine((value) => /^[A-Za-z\s]*$/.test(value), {
      message: "Name must only contain English letters and spaces",
    }),
  description: asOptionalField(
    z
      .string()
      .trim()
      .min(3, { message: "Description must be at least 3 characters long" })
      .refine((value) => /^[A-Za-z\s.]*$/.test(value), {
        message:
          "Description must only contain English letters, spaces, and periods",
      })
      .optional(),
  ),
})

export const RoleForm = ({
  isEditable,
  roleId,
  orgUsername,
}: {
  isEditable: boolean
  roleId: string | null
  orgUsername: string
}) => {
  const router = useRouter()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  })
  const isFormReset = useRef(false)

  const activeOrgId = useAuthStore((state) => state.activeOrgId)

  const createANewRole = accessControlHooks.usePostRole()
  const editRole = accessControlHooks.usePatchRoleById()

  const { data: roleData } = accessControlHooks.useGetRoleById(
    activeOrgId,
    roleId,
  )

  useEffect(() => {
    if (isEditable && roleData?.data.name && !isFormReset.current) {
      form.setValue("name", roleData.data.name)
      form.setValue("description", roleData.data.description || "")
    }
  }, [form, isEditable, roleData])

  function onSubmit(data: z.infer<typeof FormSchema>) {
    if (!activeOrgId) return

    if (isEditable && roleId) {
      editRole
        .mutateAsync({ orgId: activeOrgId, roleId, body: data })
        .then((value) => {
          if (value.status === "SUCCESS") {
            toast.success(`The role has been successfully updated.`)
            form.reset()
            isFormReset.current = true
            router.push(`/orgs/${orgUsername}/access-control`)
          }
        })
    } else {
      createANewRole
        .mutateAsync({ orgId: activeOrgId, body: data })
        .then((value) => {
          if (value.status === "SUCCESS") {
            toast.success(`The role has been successfully created.`)
            form.reset()
          }
        })
    }
  }

  return (
    <section>
      <Card className="mx-auto max-w-2xl">
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Role name <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="New role" {...field} />
                    </FormControl>
                    <FormDescription>
                      This name will be used to identify the role in the system.
                      It should be unique and descriptive.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Role description" {...field} />
                    </FormControl>
                    <FormDescription>
                      This description will be used to provide more information
                      about the role.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={createANewRole.isPending}>
                {isEditable
                  ? editRole.isPending
                    ? "Updating..."
                    : "Update role"
                  : createANewRole.isPending
                    ? "Creating..."
                    : "Create a new role"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </section>
  )
}
