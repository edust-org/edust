"use client"

import { Separator, Typography } from "@/components/ui"

import { Layout } from "./components/layout"

export default function Organizations() {
  return (
    <Layout>
      <title>Organization Dashboard</title>
      <Layout.Header>
        <Typography variant="h1">Organizations Dashboard</Typography>
      </Layout.Header>
      <Layout.Body>
        <Separator className="my-8" />
      </Layout.Body>
    </Layout>
  )
}
