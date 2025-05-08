import { QueryClient } from "@tanstack/react-query"

import { registerEvent } from "../event-registry"
import { socketEvents } from "../events-name"

export const authHandlers = (queryClient: QueryClient) => {
  registerEvent(socketEvents.user.authUpdate, (payload) => {
    if (payload?.refetch?.includes("/auth/me")) {
      queryClient.invalidateQueries({ queryKey: ["authMe"] })
    }
  })
}
