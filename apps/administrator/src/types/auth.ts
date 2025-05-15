import { PermissionValues } from "@/lib/pm"
import { Organization, Roles, User } from "@/types"

export type Academics = Pick<
  Organization,
  "id" | "name" | "orgUsername" | "profilePic"
> & { studentId: string; orgId: string }

export type AuthMe = User & {
  systemRole: {
    id: string
    roleId: string
    role: Roles
    rolePermissions: PermissionValues
  }
  organizations: null
  academics: null
}
