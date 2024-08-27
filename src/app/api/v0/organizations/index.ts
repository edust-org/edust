import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiUrlV0 } from "@/app/api/axios-api-url";

export const organizationsApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${apiUrlV0}/organizations`,
    credentials: "include",
  }),

  reducerPath: "API_V0_OrganizationsApi",
  tagTypes: ["Organizations"],

  endpoints: (build) => ({
    getOrgLists: build.query<any, void>({
      query: () => `/`,
    }),
    postOrganization: build.mutation({
      query: (body) => ({
        url: `/`,
        method: "POST",
        body,
      }),
    }),

    // site
    getSite: build.query<any, void>({
      query: () => `/site`,
    }),

    editSite: build.mutation({
      query: (body) => ({
        url: `/sites`,
        method: "PATCH",
        body,
      }),
    }),

    // Pages
    postPages: build.mutation({
      query: (body) => ({
        url: `/sites/pages`,
        method: "POST",
        body,
      }),
    }),
    getAllPages: build.query<any, void>({
      query: () => `/sites/pages`,
    }),
    getPageById: build.query({
      query: (pageId) => `/sites/pages/${pageId}`,
    }),

    editPageById: build.mutation({
      query: ({ pageId, ...patch }) => ({
        url: `/sites/pages/${pageId}`,
        method: "PATCH",
        body: patch,
      }),
    }),
    deletePageById: build.mutation({
      query(pageId) {
        return {
          url: `/sites/pages/${pageId}`,
          method: "DELETE",
        };
      },
    }),

    // Upload Images
    postImages: build.mutation({
      query: (body) => ({
        url: `/sites/pages/upload-images`,
        method: "POST",
        body,
      }),
    }),
    getAllImages: build.query<void, void>({
      query: () => `/sites/pages/upload-images`,
    }),
  }),
});

export const {
  useGetOrgListsQuery,
  usePostOrganizationMutation,
  useGetSiteQuery,
  useEditSiteMutation,
  usePostPagesMutation,
  useGetAllPagesQuery,
  useGetPageByIdQuery,
  useEditPageByIdMutation,
  useDeletePageByIdMutation,
  usePostImagesMutation,
  useGetAllImagesQuery,
} = organizationsApi;
