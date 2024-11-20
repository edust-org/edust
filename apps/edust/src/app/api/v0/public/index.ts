import { createApi } from "@reduxjs/toolkit/query/react"
import { apiV0BaseQuery } from "../../api-url"

export const publicApi = createApi({
  baseQuery: apiV0BaseQuery("/public"),

  reducerPath: "API_V0_publicApi",
  tagTypes: ["Public"],

  endpoints: (build) => ({
    getOrgSitesByOrgId: build.query({
      query: ({ orgId, filters }) => {
        const queryParams = new URLSearchParams(filters).toString()
        return `/organizations/orgId-${orgId}/site/?${queryParams}`
      },
    }),
    getOrgSitesByUsername: build.query({
      query: ({ orgUsername, filters }) => {
        const queryParams = new URLSearchParams(filters).toString()
        return `/organizations/orgUsername-${orgUsername}/site/?${queryParams}`
      },
    }),
    getInstitutes: build.query({
      query: ({ filters }) => {
        const queryParams = new URLSearchParams(filters).toString()
        return `/institutes?${queryParams}`
      },
    }),
    getInstituteById: build.query({
      query: (id) => {
        return `/institutes/${id}`
      },
    }),
    getInstitutesCategories: build.query({
      query: () => {
        return `/institutes/categories`
      },
    }),
  }),
})

export const {
  useGetOrgSitesByOrgIdQuery,
  useGetOrgSitesByUsernameQuery,
  useGetInstitutesQuery,
  useGetInstituteByIdQuery,
  useGetInstitutesCategoriesQuery,
} = publicApi
