import { defaultValues } from "@/configs"
import axios from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"

// Define the type for a single role item
export type RoleItem = {
  id: string
  name: string
}

// Custom hook to fetch roles
export function useRoles(activeOrgId: string | null) {
  return useQuery<RoleItem[]>({
    queryKey: ["roles", activeOrgId], // Query key
    queryFn: async () => {
      const res = await axios.get(
        `${defaultValues.backendURL}/api/v0/organizations/${activeOrgId}/access-control/roles`,
      )

      const items = res.data?.data?.items || []

      return items.sort((a: RoleItem, b: RoleItem) =>
        a.name.localeCompare(b.name),
      )
    },
    enabled: !!activeOrgId, // Only fetch if activeOrgId exists
  })
}
