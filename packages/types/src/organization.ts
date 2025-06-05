import type { PermissionValues, Roles } from "@edust/types"

export type Organization = {
  id: string
  name: string
  orgUsername: string
  profilePic: string | null
  roleId: string
  role: Roles.owner | string
  rolePermissions: PermissionValues[]
}
