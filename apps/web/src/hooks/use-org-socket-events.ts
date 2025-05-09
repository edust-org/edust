"use client"

import { dispatchEvent, socketEvents, updatePermissions } from "@/lib/socket"
import { useAuthStore } from "@/store"
import { useQueryClient } from "@tanstack/react-query"

import { useEffect } from "react"

export const useOrgSocketEvents = () => {
  const { socketOrg, isSocketOrgConnected, activeOrgId } = useAuthStore(
    (state) => state,
  )
  const queryClient = useQueryClient()

  useEffect(() => {
    if (!socketOrg || !isSocketOrgConnected) return

    // Register handlers with queryClient
    updatePermissions(queryClient)

    const allEvents = [socketEvents.org.accessRolePermissionsUpdate]

    allEvents.forEach((event) => {
      socketOrg.on(event, (payload: any) => dispatchEvent(event, payload))
    })

    return () => {
      allEvents.forEach((event) => {
        socketOrg.off(event)
      })
    }
  }, [socketOrg, queryClient, isSocketOrgConnected, activeOrgId])
}
