
import { PermissionValues } from "./pm"
import { Roles } from "./common/roles"


export type Organization = {
  id: string
  name: string
  orgUsername: string
  profilePic: string | null
  roleId: string
  role: Roles.owner | string
  rolePermissions: PermissionValues[]
}
