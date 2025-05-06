import api from "@/lib/api"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useGetUserNotifications = (query?: {
  filter?: { status?: string }
  limit?: string
}) => {
  return useQuery({
    queryKey: ["user-notifications", query],
    queryFn: () => api.v0.getUserNotifications(query),
  })
}

interface EditReadPayload {
  userNotificationIds?: string[]
  markAllAsRead?: boolean
}

export const useEditNotificationsAsRead = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: EditReadPayload) =>
      api.v0.editUserNotificationsAsRead(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-notifications"] })
    },
  })
}
