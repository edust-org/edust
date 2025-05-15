"use client"

import {
  authHandlers,
  dispatchEvent,
  notificationsHandlers,
  socketEvents,
} from "@/lib/socket"
import { useAuthStore } from "@/store"
import { useQueryClient } from "@tanstack/react-query"

import { useEffect } from "react"

export const useSocketEvents = () => {
  const socket = useAuthStore((state) => state.socket)
  const queryClient = useQueryClient()

  useEffect(() => {
    if (!socket) return
    // Register handlers with queryClient
    authHandlers(queryClient)
    notificationsHandlers(queryClient)

    const allEvents = [
      socketEvents.user.authUpdate, // TODO: it's not work for nextAuth (hasRole need update next session)
      socketEvents.notification.new,
    ]

    allEvents.forEach((event) => {
      socket.on(event, (payload: any) => dispatchEvent(event, payload))
    })

    return () => {
      allEvents.forEach((event) => {
        socket.off(event)
      })
    }
  }, [socket, queryClient])
}
