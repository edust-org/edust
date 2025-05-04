"use client"

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  Switch,
} from "@/components/ui"
import { defaultValues } from "@/configs"
import axios from "@/lib/axios"
import { useAuthStore } from "@/lib/store"
import { Roles } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { AxiosError } from "axios"
import { UseFormReturn, useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { useEffect, useState } from "react"

const FormSchema = z.object({
  permission_lists: z.array(z.string()),
})

type FormData = z.infer<typeof FormSchema>

type PermissionItem = {
  id: string
  name: string
  label: string
  description: string
  hasAccess: boolean
}

interface PermissionFormProps {
  roleId: string
  roleName: string
}

export const PermissionForm: React.FC<PermissionFormProps> = ({
  roleId,
  roleName,
}) => {
  const state = useAuthStore()

  const [permissionLists, setPermissionLists] = useState<PermissionItem[]>([])

  const form: UseFormReturn<FormData> = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      permission_lists: [],
    },
  })

  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    axios
      .get(
        `${defaultValues.backendURL}/api/v0/organizations/${state.activeOrgId}/access-control/roles/${roleId}/permissions`,
      )
      .then((res) => {
        const items = res.data?.data?.items || []
        setPermissionLists(items)
        const initiallyGrantedPermissions = items
          .filter((item: PermissionItem) => item.hasAccess)
          .map((item: PermissionItem) => item.id)

        form.setValue("permission_lists", initiallyGrantedPermissions)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [state.activeOrgId, roleId, form, isSaving])

  async function onSubmit(data: FormData) {
    // Permissions that were initially granted
    const initiallyGrantedPermissions = permissionLists
      .filter((item) => item.hasAccess)
      .map((item) => item.id)

    // Permissions to add (checked but not initially granted)
    const permissionsToAdd = data.permission_lists.filter(
      (item) => !initiallyGrantedPermissions.includes(item),
    )

    // Permissions to remove (unchecked but were initially granted)
    const permissionsToRemoveIds = initiallyGrantedPermissions.filter(
      (item) => !data.permission_lists.includes(item),
    )

    if (permissionsToAdd.length > 0) {
      await handleAddPermissions()
      setIsSaving(!isSaving)
    }

    if (permissionsToRemoveIds.length > 0) {
      await handleRemovePermissions()
      setIsSaving(!isSaving)
    }

    async function handleAddPermissions() {
      try {
        const res = await axios.post(
          `${defaultValues.backendURL}/api/v0/organizations/${state.activeOrgId}/access-control/roles/${roleId}/permissions`,
          {
            permissionIds: permissionsToAdd,
          },
        )
        toast.success(res.data?.message)
      } catch (error) {
        toast.error(
          (error as AxiosError<{ message?: string }>).response?.data?.message ||
            "An error occurred",
        )
      }
    }

    async function handleRemovePermissions() {
      try {
        const res = await axios.post(
          `${defaultValues.backendURL}/api/v0/organizations/${state.activeOrgId}/access-control/roles/${roleId}/permissions/bulk-delete`,
          {
            permissionIds: permissionsToRemoveIds,
          },
        )
        toast.success(res.data?.message)
      } catch (error) {
        toast.error(
          (error as AxiosError<{ message?: string }>).response?.data?.message ||
            "An error occurred",
        )
      }
    }
  }

  return (
    <Card className="mx-auto max-w-xl">
      <CardHeader>
        <CardTitle>Set the permissions</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            <div className="space-y-4">
              {permissionLists.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="permission_lists"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel>{item.label}</FormLabel>
                        <FormDescription>{item.description}</FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value.includes(item.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              field.onChange([...field.value, item.id])
                            } else {
                              field.onChange(
                                field.value.filter(
                                  (value) => value !== item.id,
                                ),
                              )
                            }
                          }}
                          disabled={roleName === Roles.owner}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              ))}
            </div>
            <Button type="submit" disabled={roleName === Roles.owner}>
              Save preferences
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
