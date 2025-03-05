import { AccountType } from "./account-type"
import { OrganizationRoles } from "./organization"
import { Roles } from "./roles"

export interface User {
  id: string
  name: string
  username: string
  email: string
  password: string
  accountType: AccountType
  accountDetails?: object
  profilePic: string | null
  profilePicDetails?: Record<string, unknown>
  isVerified: boolean
  isProfileVerified: boolean
  systemRole: Roles
  organizationRoles: OrganizationRoles[]
  createdAt: Date
  updatedAt: Date
}
