import { defaultValues } from "@/configs"
import axios from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"

// Define the type for a single role item

export type RoleItem = {
  id: string
  name: string
  description: null | string
  orgId: string
  createdAt: string
  updatedAt: string
}

export function useGetRoleById(
  activeOrgId: string | null,
  roleId: string | null,
) {
  return useQuery<RoleItem>({
    queryKey: ["roles", activeOrgId, roleId], // Query key
    queryFn: async () => {
      if (!activeOrgId || !roleId) {
        return []
      }
      const res = await axios.get(
        `${defaultValues.backendURL}/api/v0/organizations/${activeOrgId}/access-control/roles/${roleId}`,
      )
      return res.data?.data || []
    },
    enabled: !!activeOrgId && !!roleId,
  })
}
