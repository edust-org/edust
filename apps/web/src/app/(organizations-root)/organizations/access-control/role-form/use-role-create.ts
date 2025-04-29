import { defaultValues } from "@/configs"
import axios from "@/lib/axios"
import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query"
import { toast } from "sonner"

interface RoleCreateData {
  name: string
  description?: string
}

interface RoleCreateResponse {
  id: string
  name: string
  description: null | string
  orgId: string
  createdAt: string
  updatedAt: string
}

export function useRoleCreate(
  activeOrgId: string | null,
): UseMutationResult<RoleCreateResponse, unknown, RoleCreateData> {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: RoleCreateData) => {
      if (!activeOrgId) {
        throw new Error("Active organization ID is required")
      }
      const response = await axios.post<RoleCreateResponse>(
        `${defaultValues.backendURL}/api/v0/organizations/${activeOrgId}/access-control/roles`,
        data,
      )
      return response.data
    },
    onSuccess: () => {
      toast.success(`The role has been successfully created.`)

      queryClient.invalidateQueries({ queryKey: ["roles", activeOrgId] })
    },
    onError: (error: unknown) => {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message ||
        "An unexpected error occurred while creating the role."

      toast.error(errorMessage)
    },
  })
}
