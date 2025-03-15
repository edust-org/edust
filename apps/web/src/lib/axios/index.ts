import { defaultValues } from "@/configs"
import axiosCore from "axios"
import { getSession } from "next-auth/react"

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
    const data = await getSession()
    const accessToken = data?.accessToken

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

export default axios
