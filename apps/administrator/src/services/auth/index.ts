import { Academics, Organization } from "@/types"

const findActiveOrganization = (
  organizations: Organization[] | null,
  activeOrgId: string | null,
): Organization | null => {
  return organizations?.find((org) => org.id === activeOrgId) || null
}

const findActiveAcademy = (
  academics: Academics[] | null,
  activeAcademyId: string | null,
): Academics | null => {
  return academics?.find((acd) => acd.id === activeAcademyId) || null
}

export const authService = {
  findActiveOrganization,
  findActiveAcademy,
}
