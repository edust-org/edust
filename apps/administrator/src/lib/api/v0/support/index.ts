import { defaultValues } from "@/configs"
import axios from "@/lib/axios"
import { ApiResponse } from "@edust/types"

import { SupportUser, SupportUserQuery } from "./support-types"

const baseUrl = `${defaultValues.apiV0AdmURL}/support`

export const support = {
  getSupportUsers: async (
    query: SupportUserQuery,
  ): Promise<ApiResponse<{ items: SupportUser[] }>> => {
    const res = await axios.get(`${baseUrl}/users`, {
      params: query,
    })
    return res.data
  },
}

export * from "./ticket"
