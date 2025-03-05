import { createApi } from "@reduxjs/toolkit/query/react"
import { apiV0BaseQuery } from "../../api-url"
import createQueryString, { QueryObject } from "../../create-query-string"

export interface GetInstitutesQuery {
  search?: { name?: string }
  filter?: {
    instituteCategoryId?: string
    codeType?: string
    code?: string
    countryName?: string
  }
  foundedDate?: { from?: Date; to?: Date }
  sortBy?: "foundedDate" | "name" | "country"
  order?: "ASC" | "DESC"
  page?: string
  limit?: string
}

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
    getInstitutes: build.query<any, GetInstitutesQuery>({
      query: (filters: QueryObject) => {
        return `/institutes${createQueryString(filters)}`
      },
    }),
    getInstituteById: build.query({
      query: (id) => {
        return `/institutes/${id}`
      },
    }),
    getInstitutesCategories: build.query({
      query: (filters) => {
        return `/institutes/categories${createQueryString(filters)}`
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
