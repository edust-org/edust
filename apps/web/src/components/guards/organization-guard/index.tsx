import { FullSpinner } from "@/components"
import { useOrganizationGuard } from "@/hooks"
import { PermissionValues } from "@/lib/pm"

import { ReactNode } from "react"

import { HasOrgPermission } from "./has-org-permission"

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
    return <FullSpinner />
  }

  return (
    <HasOrgPermission requiredPermissions={requiredPermissions}>
      {children}
    </HasOrgPermission>
  )
}
