import { Roles } from "./roles"

export interface Organization {
  id: string
  name: string
  orgUsername: string
  createdAt: Date
  updatedAt: Date
}

export interface OrganizationRoles {
  id: string
  role: Roles
  organization: Organization
}
