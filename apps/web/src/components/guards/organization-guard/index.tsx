import { Loading } from "@/components"
import { PermissionValues } from "@/lib/pm"

import { ReactNode } from "react"

import { HasOrgPermission } from "./has-org-permission"
import { useOrganizationGuard } from "./use-organization-guard"

interface OrganizationGuardProps {
  children: ReactNode
  requiredPermissions: PermissionValues
}

export const OrganizationGuard: React.FC<OrganizationGuardProps> = ({
  children,
  requiredPermissions,
}) => {
  const { isLoading } = useOrganizationGuard()

  if (isLoading) {
    return <Loading.FullScreen />
  }

  return (
    <HasOrgPermission requiredPermissions={requiredPermissions}>
      {children}
    </HasOrgPermission>
  )
}

export * from "./has-org-permission"
