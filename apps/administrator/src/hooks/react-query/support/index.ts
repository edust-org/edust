import api from "@/lib/api"
import {
  SupportUser,
  SupportUserQuery,
} from "@/lib/api/v0/support/support-types"
import { ApiResponse } from "@/types"
import { useQuery } from "@tanstack/react-query"

export const supportHooks = {
  useGetSupportUsers: (query: SupportUserQuery) =>
    useQuery<ApiResponse<{ items: SupportUser[] }>>({
      queryKey: ["support", query],
      queryFn: () => api.v0.support.getSupportUsers(query),
    }),
}

export * from "./ticket"
