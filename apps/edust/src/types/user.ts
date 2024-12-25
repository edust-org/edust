import { AccountType } from "./account-type"
import { OrganizationRoles } from "./organization"
import { Roles } from "./roles"

export interface User {
  id: string
  name: string
  username: null | string
  email: string
  password: string
  accountType: AccountType
  accountDetails: null | object
  isVerified: boolean
  isProfileVerified: boolean
  systemRole: Roles
  organizationRoles: null | OrganizationRoles[]
  createdAt: Date
  updatedAt: Date
}
