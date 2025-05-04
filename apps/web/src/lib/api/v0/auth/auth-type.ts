import { PermissionValues } from "@/lib/pm"
import { ApiResponse, Roles } from "@/types"

export type AuthMeResponse = ApiResponse<{
  id: string
  name: string
  username: string
  email: string
  profilePic: string
  hasRoles?: {
    system?: boolean
    organization?: boolean
  }
  createdAt: string
  updatedAt: string
  systemRole: null | string
  organizations: Array<{
    id: string
    name: string
    orgUsername: string
    profilePic: string | null
    roleId: string
    role: Roles.owner | string
    rolePermissions: PermissionValues[]
  }>
}>
