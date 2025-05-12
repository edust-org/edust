"use client"

import { Separator, Typography } from "@/components/ui"

import { Layout } from "./components/layout"
import { PlayRoomSocket } from "./components/play-room-socket"

export default function Organizations() {
  return (
    <Layout>
      <title>Organization Dashboard</title>
      <Layout.Header>
        <Typography variant="h1">Organizations Dashboard</Typography>
      </Layout.Header>
      <Layout.Body>
        <Separator className="my-8" />
        <PlayRoomSocket />
      </Layout.Body>
    </Layout>
  )
}
