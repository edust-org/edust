"use client"

import { Typography } from "@/components/ui"
import { Roles } from "@/types"
import { useSession } from "next-auth/react"

export default function BuilderLayout({ children }) {
  const { data } = useSession()

  const orgId = data?.user.organizationRoles
    ?.filter((role) => role.role === Roles.OWNER)
    .map((role) => role.organization.id)[0]

  if (orgId) {
    return children
  } else {
    return (
      <Typography className="text-destructive">
        Organization id not found!
      </Typography>
    )
  }
}
