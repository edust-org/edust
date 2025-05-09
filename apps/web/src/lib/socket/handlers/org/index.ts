import { registerEvent, socketEvents } from "@/lib/socket"
import { QueryClient } from "@tanstack/react-query"

export const updatePermissions = (queryClient: QueryClient) => {
  registerEvent(socketEvents.org.accessRolePermissionsUpdate, (payload) => {
    if (payload?.refetch?.includes("/auth/me")) {
      queryClient.invalidateQueries({ queryKey: ["authMe"] })
    }
  })
}
