"use client"

import { useAuthStore } from "@/store"
import { Typography } from "@edust/ui"
import { useParams } from "next/navigation"

export default function Page() {
  const { username } = useParams<{ username: string }>()

  const { getProfile, activeProfileOrgId } = useAuthStore()

  const profile = getProfile(username)

  return (
    <>
      <Typography variant="h1">{profile?.organization.name} </Typography>
      <Typography>Org Username: {profile?.organization.orgUsername}</Typography>
      <Typography> Active Org ID: {activeProfileOrgId} </Typography>
    </>
  )
}
