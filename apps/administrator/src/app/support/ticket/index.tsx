"use client"

import { ticketHooks } from "@/hooks/react-query"
import { Message } from "@/lib/api/v0/support/support-types"
import { socketEvents } from "@/lib/socket"
import { useAuthStore } from "@/store"
import { ScrollArea } from "@edust/ui"

import { useEffect } from "react"

import { ChatBox } from "./chat-box"
import { Messages } from "./messages"
import { useMessagesStore } from "./messages-store"

type TicketProps = {
  ticketId: string
  myUserId: string
}

export const Ticket: React.FC<TicketProps> = ({ ticketId, myUserId }) => {
  const { socket } = useAuthStore()

  const { messages, setMessages, addMessage } = useMessagesStore()

  const { data } = ticketHooks.useGetMessages(ticketId)

  useEffect(() => {
    if (data?.data.items) {
      setMessages(data.data.items)
    }
  }, [data?.data.items, setMessages])

  // Join the room
  useEffect(() => {
    if (!socket || !ticketId) return

    socket.emit(socketEvents.rooms.supportTicketJoin, ticketId)

    // Clean up: Leave the previous ticket room on unmount or ticketId change
    return () => {
      socket.emit(socketEvents.rooms.supportTicketLeave, ticketId)
    }
  }, [socket, ticketId])

  // Handle incoming messages
  useEffect(() => {
    if (!socket) return

    const handler = (data: Message) => {
      addMessage(data)
    }

    socket.on(socketEvents.support.ticket.newMessage, handler)

    return () => {
      socket.off(socketEvents.support.ticket.newMessage, handler)
    }
  }, [socket, addMessage])

  return (
    <>
      <ScrollArea className="bg-muted h-[calc(100vh-110px)] rounded-lg p-4">
        {myUserId && <Messages messages={messages} myUserId={myUserId} />}

        {ticketId && <ChatBox ticketId={ticketId} />}
      </ScrollArea>
    </>
  )
}
