"use client"

import { Layout } from "@/components"
import { useAuthStore } from "@/store"
import { Typography } from "@edust/ui"
import { useParams } from "next/navigation"

export default function Page() {
  const { orgUsername } = useParams<{ orgUsername: string }>()

  const { getOrganization } = useAuthStore()

  const organization = getOrganization(orgUsername)

  return (
    <Layout>
      <Layout.Header>
        <Typography variant="h2">Your Organization</Typography>
      </Layout.Header>
      <Layout.Body>
        <Typography variant="h1">{organization?.name} </Typography>
      </Layout.Body>
    </Layout>
  )
}
