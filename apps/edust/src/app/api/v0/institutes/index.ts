import { createApi } from "@reduxjs/toolkit/query/react"
import { apiV0BaseQuery } from "../../api-url"
import { Institute, Status } from "@/types"

interface Link {
  href: string
  method: string
}

interface Links {
  [key: string]: Link
}

type InstituteMe = Pick<
  Institute,
  | "id"
  | "instituteCategoryId"
  | "instituteCategory"
  | "name"
  | "slug"
  | "code"
  | "codeType"
  | "status"
  | "createdAt"
  | "updatedAt"
>

interface InstituteMeResponse {
  status: Status
  message: string
  data: {
    items: InstituteMe[]
  }
  _link: Links
}

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
    getMeInstitutesLists: build.query<InstituteMe[], void>({
      query: () => `/me`,
      transformResponse: (response: InstituteMeResponse): InstituteMe[] => {
        console.log(response)
        return response?.data?.items || []
      },
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
