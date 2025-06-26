import { defaultValues } from "@/configs"
import { ACTIVE_ORG_ID_HEADER, ACTIVE_PROFILE_ORG_ID_HEADER } from "@/constant"
import { useAuthStore } from "@/store"
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
    const activeOrgId = useAuthStore.getState().activeOrgId

    if (activeOrgId) {
      config.headers[ACTIVE_ORG_ID_HEADER] = activeOrgId
    }

    const activeProfileOrgId = useAuthStore.getState().activeProfileOrgId
    if (activeProfileOrgId) {
      config.headers[ACTIVE_PROFILE_ORG_ID_HEADER] = activeProfileOrgId
    }

    return config
  },
  (error) => Promise.reject(error),
)

export default axios
