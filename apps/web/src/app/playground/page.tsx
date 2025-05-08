"use client"

import { LiveMessagePlay } from "@/components/live-message-play"
import { Button, Typography } from "@/components/ui"
import { useSession } from "next-auth/react"

export default function Playground() {
  const session = useSession()
  return (
    <>
      <Typography variant="h2">Playground</Typography>

      <Button
        onClick={() => {
          session.update({ hasRole: false })
        }}
      >
        Session update
      </Button>

      <LiveMessagePlay />
    </>
  )
}
