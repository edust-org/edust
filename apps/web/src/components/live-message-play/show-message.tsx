"use client"

import { getSocket } from "@/lib/socket"

import { useEffect, useState } from "react"

export default function ShowMessage() {
  const [messages, setMessages] = useState<string[]>([])

  useEffect(() => {
    const socket = getSocket()

    socket.on("connect", () => {
      console.log("✅ Connected to socket server")
    })

    socket.on("message", (msg: string) => {
      setMessages((prev) => [...prev, msg])
    })

    // Clean up
    return () => {
      socket.off("message")
    }
  }, [])

  return (
    <div className="p-4">
      <h1 className="mb-4 text-xl font-semibold">Live Support Chat</h1>
      <div className="space-y-2">
        {messages.map((msg, i) => (
          <div key={i} className="rounded bg-gray-100 p-2">
            {msg}
          </div>
        ))}
      </div>
    </div>
  )
}
