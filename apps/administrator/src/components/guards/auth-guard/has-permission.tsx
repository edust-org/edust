import { PermissionValues } from "@/lib/pm"

import { AuthGuard, AuthGuardProps } from "."

export const HasPermission = (
  props: AuthGuardProps & {
    requiredPermissions: PermissionValues | PermissionValues[]
  },
) => {
  return <AuthGuard {...props} />
}
