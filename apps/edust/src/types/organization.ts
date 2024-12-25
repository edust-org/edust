import { Roles } from "./roles"

export interface Organization {
  id: string
  name: string
  orgUsername: string
  profileVerified: string
  createdAt: Date
  updatedAt: Date
}

export interface OrganizationRoles {
  id: string
  role: Roles
  name: string
}
