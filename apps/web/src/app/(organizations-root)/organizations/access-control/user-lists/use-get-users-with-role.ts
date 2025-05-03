import { defaultValues } from "@/configs"
import axios from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"

// Define the type for a single role item
export type RoleItem = {
  id: string
  name: string
}
export const useGetUsersWithRole = (
  activeOrgId: string | null,
  roleId: string | null,
) => {
  return useQuery<RoleItem[]>({
    queryKey: ["users", activeOrgId, roleId], // Query key
    queryFn: async () => {
      const res = await axios.get(
        `${defaultValues.backendURL}/api/v0/organizations/${activeOrgId}/access-control/roles/${roleId}/users`,
      )

      const items = res.data?.data?.items || []

      return items.sort((a: RoleItem, b: RoleItem) =>
        a.name.localeCompare(b.name),
      )
    },
    enabled: !!activeOrgId && !!roleId,
  })
}
