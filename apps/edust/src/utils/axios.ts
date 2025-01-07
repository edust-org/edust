import { signOut } from "@/app/features"
import { store } from "@/app/store"
import defaultAxios from "axios"

const axios = defaultAxios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
})

axios.interceptors.request.use((config) => {
  const state = store.getState()
  const token = state.authentication.auth?.token
  let expiresAt = state.authentication.auth?.expiresAt
  expiresAt = new Date(expiresAt)
  const currentDate = new Date()

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`
  } else {
    // Remove the Authorization header if no token is provided
    delete config.headers["Authorization"]
  }

  if (expiresAt < currentDate) {
    store.dispatch(signOut())
  }

  return config
})
export default axios
/*
export default () => {
  const state = store.getState()

  // Axios - Set default configurations
  axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL
  axios.defaults.headers.common["Content-Type"] = "application/json"
  axios.defaults.withCredentials = true // for cookies

  const token = state.authentication.auth?.token

  let expiresAt = state.authentication.auth?.expiresAt
  expiresAt = new Date(expiresAt)
  const currentDate = new Date()

  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
  } else {
    // Remove the Authorization header if no token is provided
    delete axios.defaults.headers.common["Authorization"]
  }

  if (expiresAt < currentDate) {
    store.dispatch(signOut())
  }

  
  // Add interceptors if needed
  axios.interceptors.request.use(
    (config) => {
      console.log("Request:", config)
      return config
    },
    (error) => {
      console.error("Request Error:", error)
      return Promise.reject(error)
    },
  )

  axios.interceptors.response.use(
    (response) => {
      console.log("Response:", response)
      return response
    },
    (error) => {
      console.error("Response Error:", error)
      return Promise.reject(error)
    },
  )
}
*/
