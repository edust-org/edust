"use client"

import { Feedback, OrganizationGuard } from "@/components"

export default function Playground() {
  return (
    <OrganizationGuard requiredPermissions="siteBuilder:create">
      <Feedback />
    </OrganizationGuard>
  )
}
