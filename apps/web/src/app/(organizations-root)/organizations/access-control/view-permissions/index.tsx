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
    <section>
      <div className="mb-8">
        <Typography variant="h3">View Permissions</Typography>
      </div>
      <PermissionForm roleId={roleId} roleName={roleName} />
    </section>
  )
}
