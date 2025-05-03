import { defaultValues } from "@/configs"
import axios from "@/lib/axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

interface UseDeleteUserParams {
  userId: string
  assignId: string
}

export const useRemoveUser = (activeOrgId: string | null) => {
  const queryClient = useQueryClient()
  return useMutation<unknown, Error, UseDeleteUserParams>({
    mutationFn: async ({ userId, assignId }: UseDeleteUserParams) => {
      await axios.delete(
        `${defaultValues.backendURL}/api/v0/organizations/${activeOrgId}/access-control/users/${userId}/role-assignments/${assignId}`,
      )
    },
    onSuccess: () => {
      toast.success("User removed successfully")
      queryClient.invalidateQueries({ queryKey: ["users", activeOrgId] })
    },
    onError: () => {
      toast.error("Failed to remove user")
    },
  })
}
