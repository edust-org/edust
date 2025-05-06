import { defaultValues } from "@/configs"
import axios from "@/lib/axios"
import QueryString from "qs"

const BASE_URL = `${defaultValues.apiV0URL}/notifications`

export const getUserNotifications = async (query?: {
  filter?: { status?: string }
  limit?: string
}): Promise<any> => {
  const queryString = QueryString.stringify(query)
    ? `?${QueryString.stringify(query)}`
    : ""

  const response = await axios.get(`${BASE_URL}/${queryString}`)
  return response.data
}

interface EditReadPayload {
  userNotificationIds?: string[]
  markAllAsRead?: boolean
}

export const editUserNotificationsAsRead = async (
  payload: EditReadPayload,
): Promise<any> => {
  const response = await axios.patch(`${BASE_URL}/read`, payload)
  return response.data
}
