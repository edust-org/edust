import { defaultValues } from "@/configs"
import axios from "@/lib/axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

interface UsePostUserAssignRoleParams {
  userId: string
  roleId: string
}

export const usePostUserAssignRole = (activeOrgId: string | null) => {
  const queryClient = useQueryClient()

  return useMutation<unknown, Error, UsePostUserAssignRoleParams>({
    mutationFn: async (body: UsePostUserAssignRoleParams) => {
      await axios.post(
        `${defaultValues.backendURL}/api/v0/organizations/${activeOrgId}/access-control/users/role-assignments`,
        body,
      )
    },
    onSuccess: () => {
      toast.success("User added successfully")
      queryClient.invalidateQueries({ queryKey: ["users", activeOrgId] })
    },
    onError: () => {
      toast.error("Failed to added user")
    },
  })
}
