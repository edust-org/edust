import { Organization } from "@/types"

const findActiveOrganization = (
  organizations: Organization[] | null,
  activeOrgId: string | null,
): Organization | null => {
  return organizations?.find((org) => org.id === activeOrgId) || null
}

export const authService = {
  findActiveOrganization,
}
