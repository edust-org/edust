"use client"

import { useAuthStore } from "@/store"
import { Typography } from "@edust/ui"
import { useParams } from "next/navigation"

import { useEffect } from "react"

export default function OrganizationsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { orgUsername } = useParams<{ orgUsername: string | undefined }>()
  const { user, getOrganization, setActiveOrgId } = useAuthStore()

  const organizations = user?.organizations || []
  const organization = orgUsername ? getOrganization(orgUsername) : undefined

  useEffect(() => {
    if (orgUsername) setActiveOrgId(orgUsername)
  }, [orgUsername, setActiveOrgId])

  // Case 1: No organizations and no username in the URL
  if (!organizations.length && orgUsername === undefined) {
    return (
      <div className="container py-8">
        <Typography variant="h1">No Profiles Found</Typography>
        <Typography>
          You do not have any organization profiles. Please contact support.
        </Typography>
      </div>
    )
  }

  // Case 2: Username present but organization not found
  if (organizations.length && orgUsername && !organization) {
    return (
      <div className="container py-8">
        <Typography variant="h1">Profile Not Found</Typography>
        <Typography>
          The profile for this organization does not exist. Please contact
          support.
        </Typography>
      </div>
    )
  }

  // Default: Render children if everything is fine
  return <>{children}</>
}
