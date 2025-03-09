import { defaultValues } from "@/configs"
import axiosCore from "axios"
import { deleteCookie, getCookie, setCookie } from "cookies-next"

// Optional: Using cookies to manage tokens

const API_BASE_URL = defaultValues.backendURL

const axios = axiosCore.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
})
// Add request interceptor for authenticated calls
axios.interceptors.request.use(
  async (config) => {
    const token = getCookie("accessToken")
    const expiresAt = getCookie("expiresAt")

    if (expiresAt) {
      const expiredAtDate = new Date(expiresAt as string)
      const currentTime = Date.now()
      const isExpired = expiredAtDate.getTime() <= currentTime

      if (isExpired) {
        const newAccessToken = await refreshAccessToken()

        if (newAccessToken) {
          config.headers["Authorization"] = `Bearer ${newAccessToken}`
          return config
        }
      }
    }

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

const refreshAccessToken = async () => {
  const refreshToken = getCookie("refreshToken")
  try {
    const response = await axiosCore.post(
      API_BASE_URL + "/api/v0/auth/refresh",
      {
        refreshToken,
      },
    )

    const newAccessToken = response?.data?.auth?.accessToken
    const newExpiredAt = response?.data?.auth?.expiresAt

    setCookie("accessToken", newAccessToken)
    setCookie("expiresAt", newExpiredAt)

    return newAccessToken
  } catch (error) {
    deleteCookie("accessToken")
    deleteCookie("expiresAt")
    deleteCookie("refreshToken")
    window.location.href = "/auth/login"
    console.error("Error refreshing access token:", error)
  }
}

export default axios
