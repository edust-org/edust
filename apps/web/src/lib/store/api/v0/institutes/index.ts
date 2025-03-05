import { createApi } from "@reduxjs/toolkit/query/react"

import { apiV0BaseQuery } from "../../api-url"

export const institutesApi = createApi({
  baseQuery: apiV0BaseQuery("/institutes"),

  reducerPath: "API_V0_InstitutesApi",
  tagTypes: ["Institutes"],

  endpoints: (build) => ({
    postInstitute: build.mutation({
      query: (body) => ({
        url: `/`,
        method: "POST",
        body,
      }),
    }),
    getMeInstitutesLists: build.query<any, void>({
      query: () => `/me`,
    }),
    getInstitutesId: build.query({
      query: ({ instituteId, filters }) => {
        const queryParams = new URLSearchParams(filters).toString()
        return `/${instituteId}/?${queryParams}`
      },
    }),
    editInstitutesById: build.mutation({
      query: ({ id, body }) => ({
        url: `/${id}`,
        method: "PATCH",
        body,
      }),
    }),
    deleteInstituteById: build.mutation({
      query(id) {
        return {
          url: `/${id}`,
          method: "DELETE",
        }
      },
    }),
  }),
})

export const {
  usePostInstituteMutation,
  useGetInstitutesIdQuery,
  useGetMeInstitutesListsQuery,
  useEditInstitutesByIdMutation,
  useDeleteInstituteByIdMutation,
} = institutesApi
