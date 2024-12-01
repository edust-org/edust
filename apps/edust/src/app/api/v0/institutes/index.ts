import { createApi } from "@reduxjs/toolkit/query/react"
import { apiV0BaseQuery } from "../../api-url"

export const institutesApi = createApi({
  baseQuery: apiV0BaseQuery("/institutes"),

  reducerPath: "API_V0_InstitutesApi",
  tagTypes: ["Institutes"],

  endpoints: (build) => ({
    getInstitutesLists: build.query<any, void>({
      query: () => `/`,
    }),
    postInstitute: build.mutation({
      query: (body) => ({
        url: `/`,
        method: "POST",
        body,
      }),
    }),
  }),
})

export const { useGetInstitutesListsQuery, usePostInstituteMutation } =
  institutesApi
