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

  // Case 1: No profiles and no username in the URL
  // When no profiles exist and no username is in the URL, we display a message indicating no profiles.
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

  // Case 2: Username is present but profile not found
  // If there are profiles, but the profile for the given username does not exist, show a "Profile Not Found" message.
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

  // Default: Render the children if profiles exist and everything is valid
  return <>{children}</>
}
