```ts
import { createApi } from "@reduxjs/toolkit/query/react"
import { apiV0BaseQuery } from "@/app/api/api-url"

export const employeesApi = createApi({
  baseQuery: apiV0BaseQuery(),

  reducerPath: "API_employeesApi",
  tagTypes: ["Employees"],

  endpoints: (build) => ({
    get: build.query({
      query: () => "/employees",
    }),
    getById: build.query({
      query: (id) => `/employees/${id}`,
    }),
    add: build.mutation({
      query: (body) => ({
        url: `/employees`,
        method: "POST",
        body,
      }),
    }),
    update: build.mutation({
      query: (data: { employId: string; body: object }) => {
        const { employId, ...body } = data
        return {
          url: `/update-employees/${employId}`,
          method: "PUT",
          body,
        }
      },
    }),
    delete: build.mutation({
      query: (companyId) => ({
        url: `/delete-employees/${companyId}`,
        method: "DELETE",
      }),
    }),
  }),
})

export const {
  useGetQuery,
  useGetByIdQuery,
  useAddMutation,
  useUpdateMutation,
  useDeleteMutation,
} = employeesApi
```
