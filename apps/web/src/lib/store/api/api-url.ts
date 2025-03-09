import { defaultValues } from "@/configs"
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import axios from "axios"
import { deleteCookie, getCookie, setCookie } from "cookies-next"

const refreshAuthToken = async (refreshToken: string) => {
  try {
    const response = await axios.post(
      `${defaultValues.backendURL}/api/v0/auth/refresh`,
      {
        refreshToken,
      },
    )

    const newAccessToken = response?.data?.auth?.accessToken
    const newExpiredAt = response?.data?.auth?.expiresAt

    if (newAccessToken) {
      setCookie("accessToken", newAccessToken)
      setCookie("expiresAt", newExpiredAt)
      return newAccessToken
    }
  } catch (error) {
    console.error("Refresh token failed", error)
    deleteCookie("accessToken")
    deleteCookie("refreshToken")
    return null
  }
}

export const apiV0BaseQuery = (
  basePath?: string,
): ReturnType<typeof fetchBaseQuery> => {
  return fetchBaseQuery({
    baseUrl: `${defaultValues.backendURL}/api/v0${basePath || ""}`,
    credentials: "include",
    prepareHeaders: async (headers) => {
      const token = getCookie("accessToken")
      const expiresAt = getCookie("expiresAt")
      const refreshToken = getCookie("refreshToken")

      if (expiresAt) {
        const expiredAtDate = new Date(expiresAt as string)
        const currentTime = Date.now()
        const isExpired = expiredAtDate.getTime() <= currentTime

        if (isExpired) {
          const newAccessToken = await refreshAuthToken(refreshToken as string)
          if (newAccessToken) {
            headers.set("authorization", `Bearer ${newAccessToken}`)
            return headers
          }
        }
      }

      if (token) {
        headers.set("authorization", `Bearer ${token}`)
      }

      return headers
    },
  })
}
