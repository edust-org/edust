import { Roles } from "./roles"

export interface Organization {
  id: string
  name: string
  org_username: string
  profile_verified: string
  created_at: Date
  updated_at: Date
}

export interface OrganizationRoles {
  id: string
  role: Roles
  name: string
}
