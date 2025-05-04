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
} from "@/components/ui"
import { useAuthStore } from "@/lib/store"
import { asOptionalField } from "@/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { useEffect } from "react"

import { useEditRoleById } from "./use-edit-role-by-id"
import { useGetRoleById } from "./use-get-role-by-id"
import { useRoleCreate } from "./use-role-create"

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
}: {
  isEditable: boolean
  roleId: string | null
}) => {
  const router = useRouter()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  })

  const activeOrgId = useAuthStore((state) => state.activeOrgId)
  const { mutate: createRole, isPending } = useRoleCreate(activeOrgId)
  const { mutate: editRole, isPending: isEditingPending } = useEditRoleById(
    activeOrgId,
    roleId,
  )

  const { data: roleData } = useGetRoleById(activeOrgId, roleId)

  useEffect(() => {
    if (isEditable && roleData?.name) {
      form.setValue("name", roleData.name)
      form.setValue("description", roleData.description || "")
    }
  }, [form, isEditable, roleData])

  function onSubmit(data: z.infer<typeof FormSchema>) {
    if (isEditable) {
      editRole(data, {
        onSuccess: () => {
          form.reset()
        },
        onError: () => {
          form.reset()
        },
      })
      router.push("/organizations/access-control")
    } else {
      createRole(data, {
        onSuccess: () => {
          form.reset()
        },
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
                      <Input
                        placeholder="New role"
                        {...field}
                        disabled={isPending}
                      />
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
                      <Input
                        placeholder="Role description"
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormDescription>
                      This description will be used to provide more information
                      about the role.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isPending}>
                {isEditable
                  ? isEditingPending
                    ? "Updating..."
                    : "Update role"
                  : isPending
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
