"use client"

import { ScrollArea } from "@/components/ui"
import { ticketHooks } from "@/hooks/react-query"
import { useAuthStore } from "@/store"
import { useParams } from "next/navigation"

import { useEffect } from "react"

import { ChatBox } from "./chat-box"
import { Messages } from "./messages"
import { useMessagesStore } from "./messages-store"

export default function Ticket() {
  const { ticketId } = useParams<{ ticketId: string }>()
  const { messages, setMessages } = useMessagesStore()
  const { user } = useAuthStore()

  const { data } = ticketHooks.useGetMessages(ticketId)

  useEffect(() => {
    if (data?.data.items) {
      setMessages(data.data.items)
    }
  }, [data?.data.items, setMessages])

  return (
    <>
      <ScrollArea className="bg-muted h-[calc(100vh-110px)] rounded-lg p-4">
        {user?.id && <Messages messages={messages} myUserId={user.id} />}

        {ticketId && <ChatBox ticketId={ticketId} />}
      </ScrollArea>
    </>
  )
}
