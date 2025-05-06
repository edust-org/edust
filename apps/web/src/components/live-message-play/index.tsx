import { useAuthStore } from "@/store"

import React, { useEffect, useState } from "react"

import { Card, CardContent, CardHeader, CardTitle, Typography } from "../ui"
import { SendMessage } from "./send-message"

export const LiveMessagePlay = () => {
  const socket = useAuthStore((state) => state.socket) // Replace with your socket server URL
  const [messages, setMessages] = useState<string[]>([])

  useEffect(() => {
    socket?.on("live-message", (msg: string) => {
      setMessages((prev) => [msg, ...prev])
    })
  }, [socket])
  return (
    <Card className="max-w-2xl mx-auto p-4">
      <CardHeader>
        <CardTitle>LiveMessagePlay</CardTitle>
      </CardHeader>
      <SendMessage />
      <CardContent>
        {messages.map((message, index) => (
          <Typography key={index} variant="h4" className="text-blue-500">
            {message}
          </Typography>
        ))}
      </CardContent>
    </Card>
  )
}
