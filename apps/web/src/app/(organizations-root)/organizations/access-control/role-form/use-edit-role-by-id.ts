import { defaultValues } from "@/configs"
import axios from "@/lib/axios"
import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query"
import { toast } from "sonner"

interface RoleEditData {
  name: string
  description?: string
}

interface RoleEditResponse {
  id: string
  name: string
}

export function useEditRoleById(
  activeOrgId: string | null,
  roleId: string | null,
): UseMutationResult<RoleEditResponse, unknown, RoleEditData> {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: RoleEditData) => {
      if (!activeOrgId || !roleId) {
        throw new Error("Active organization ID and role ID are required")
      }
      const response = await axios.patch<RoleEditResponse>(
        `${defaultValues.backendURL}/api/v0/organizations/${activeOrgId}/access-control/roles/${roleId}`,
        data,
      )
      return response.data
    },
    onSuccess: () => {
      toast.success(`The role has been successfully updated.`)

      queryClient.invalidateQueries({
        queryKey: ["roles", activeOrgId, roleId],
      })
      queryClient.invalidateQueries({
        queryKey: ["roles", activeOrgId],
      })
    },
    onError: (error: unknown) => {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message ||
        "An unexpected error occurred while updating the role."

      toast.error(errorMessage)
    },
  })
}
