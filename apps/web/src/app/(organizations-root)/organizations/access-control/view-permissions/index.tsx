import { Typography } from "@/components/ui"

import React from "react"

import { PermissionForm } from "./permission-form"

interface ViewPermissionsProps {
  roleId: string
  roleName: string
}

export const ViewPermissions: React.FC<ViewPermissionsProps> = ({
  roleId,
  roleName,
}) => {
  return (
    <div>
      <Typography variant="h3" className="mb-8">
        ViewPermissions
      </Typography>
      <PermissionForm roleId={roleId} roleName={roleName} />
    </div>
  )
}
