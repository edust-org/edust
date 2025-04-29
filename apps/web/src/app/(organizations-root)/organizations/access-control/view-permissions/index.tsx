import { HasPermission } from "@/components"
import { Button, Typography } from "@/components/ui"
import Link from "next/link"

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
      <div className="mb-8 flex items-center justify-between gap-4">
        <Typography variant="h3">ViewPermissions</Typography>
        <HasPermission
          requiredPermissions={"org:access_control:role:create"}
          fallback
        >
          <Link href={"/organizations/access-control"}>
            <Button>New Role</Button>
          </Link>
        </HasPermission>
      </div>
      <PermissionForm roleId={roleId} roleName={roleName} />
    </section>
  )
}
