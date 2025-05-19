"use client"

import { ScrollArea } from "@/components/ui"
import { ticketHooks } from "@/hooks/react-query"

import { useEffect } from "react"

import { ChatBox } from "./chat-box"
import { Messages } from "./messages"
import { useMessagesStore } from "./messages-store"

type TicketProps = {
  ticketId: string
  myUserId: string
}

export const Ticket: React.FC<TicketProps> = ({ ticketId, myUserId }) => {
  const { messages, setMessages } = useMessagesStore()

  const { data } = ticketHooks.useGetMessages(ticketId)

  useEffect(() => {
    if (data?.data.items) {
      setMessages(data.data.items)
    }
  }, [data?.data.items, setMessages])

  return (
    <>
      <ScrollArea className="bg-muted h-[calc(100vh-110px)] rounded-lg p-4">
        {myUserId && <Messages messages={messages} myUserId={myUserId} />}

        {ticketId && <ChatBox ticketId={ticketId} />}
      </ScrollArea>
    </>
  )
}
