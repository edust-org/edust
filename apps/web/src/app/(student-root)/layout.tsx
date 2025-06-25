"use client"

import { useAuthStore } from "@/store"
import { Typography } from "@edust/ui"
import { useParams } from "next/navigation"

import { useEffect } from "react"

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { username } = useParams<{ username: string | undefined }>()
  const { setActiveProfileOrgId, getProfile, user } = useAuthStore()

  const profiles = user?.profiles || []
  const profile = username ? getProfile(username) : undefined

  useEffect(() => {
    if (username) setActiveProfileOrgId(username)
  }, [username, setActiveProfileOrgId])

  // No profiles at all
  if (!profiles.length && username === undefined) {
    return (
      <div className="container py-8">
        <Typography variant="h1">No Profiles Found</Typography>
        <Typography>
          You do not have any organization profiles. Please contact support.
        </Typography>
      </div>
    )
  }

  // Username present but profile not found
  if (profiles.length && username && !profile) {
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

  return <>{children}</>
}
