"use client"

import { useAuthStore } from "@/store"
import { Typography } from "@edust/ui"
import { useParams } from "next/navigation"

import { Layout } from "./components/layout"

export default function Page() {
  const { username } = useParams<{ username: string }>()

  const { getProfile } = useAuthStore()

  const profile = getProfile(username)

  return (
    <Layout>
      <Layout.Header>
        <Typography variant="h2">Organization Profile</Typography>
      </Layout.Header>
      <Layout.Body>
        <Typography variant="h1">{profile?.organization.name} </Typography>
      </Layout.Body>
    </Layout>
  )
}
