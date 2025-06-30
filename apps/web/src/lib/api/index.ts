import { v0 } from "./v0"
import {apiClient} from '@/lib/api-client'
const api = {
  v0,
  quizzes: apiClient,

} as const

export default api
