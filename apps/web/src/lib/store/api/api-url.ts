import { defaultValues } from "@/configs"
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { getSession } from "next-auth/react"

export const apiV0BaseQuery = (
  basePath?: string,
): ReturnType<typeof fetchBaseQuery> => {
  return fetchBaseQuery({
    baseUrl: `${defaultValues.backendURL}/api/v0${basePath || ""}`,
    credentials: "include",
    prepareHeaders: async (headers) => {
      const data = await getSession()
      if (data?.accessToken) {
        headers.set("authorization", `Bearer ${data?.accessToken}`)
      }
      return headers
    },
  })
}
