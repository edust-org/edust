import { QueryClient } from "@tanstack/react-query"
import { BellRing } from "lucide-react"
import { toast } from "sonner"

import { registerEvent } from "../event-registry"
import { socketEvents } from "../events-name"

export const notificationsHandlers = (queryClient: QueryClient) => {
  registerEvent(socketEvents.notification.new, (payload) => {
    if (payload?.refetch?.includes("/notifications")) {
      queryClient.invalidateQueries({ queryKey: ["user-notifications"] })
      toast("New notification received", {
        description: payload.message,
        duration: 5000,
        icon: <BellRing className="text-primary h-5 w-5" />,
      })
    }
  })
}
