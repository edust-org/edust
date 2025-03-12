import { OrganizationRoles } from "./organization"
import { Roles } from "./roles"

export interface User {
  id: string
  name: string
  username: string | null
  email: string
  profilePic: string | null
  systemRole: null | Roles
  organizationRoles: null | OrganizationRoles[]
  // createdAt: Date
  // updatedAt: Date
}
