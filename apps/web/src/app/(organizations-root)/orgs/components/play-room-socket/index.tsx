"use client"

import { useAuthStore } from "@/store"
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Typography,
} from "@edust/ui"

import React, { useEffect, useState } from "react"

export const PlayRoomSocket = () => {
  const { socketOrg, activeOrgId } = useAuthStore((state) => state)
  // THIS COUNTER WILL CHANGE FOR OTHER ACTIVE ORGANIZATIONS
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    if (!socketOrg) return

    const listener = (data) => {
      if (data.type === "increment") {
        setCounter((prev) => prev + 1)
      } else {
        setCounter((prev) => prev - 1)
      }
    }

    socketOrg.on("counterUpdate", listener)

    socketOrg.on("org:status:online", (data) => {
      console.log(data)
    })

    return () => {
      socketOrg.off("counterUpdate", listener)
    }
  }, [socketOrg])

  return (
    <div>
      <Typography variant="h2">PlayRoomSocket</Typography>

      <Card className="max-w-sm">
        <CardHeader>
          <CardTitle>
            Live Counter Base on room name using active orgId
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Typography variant="h3">
            Org Count: <span className="text-4xl">{counter}</span>
          </Typography>
          <Typography>ORG ID {activeOrgId}</Typography>
        </CardContent>
        <CardFooter className="flex items-center gap-8">
          <Button
            variant={"destructive"}
            onClick={() => {
              if (!socketOrg) return
              socketOrg.emit("decrement")
            }}
          >
            Decrement
          </Button>
          <Button
            onClick={() => {
              if (!socketOrg) return
              socketOrg.emit("increment")
            }}
          >
            Increment
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
