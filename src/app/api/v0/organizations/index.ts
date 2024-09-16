import { createApi } from "@reduxjs/toolkit/query/react";
import { apiV0BaseQuery } from "../../api-url";

export const organizationsApi = createApi({
  baseQuery: apiV0BaseQuery("/organizations"),

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
        url: `/site`,
        method: "PATCH",
        body,
      }),
    }),

    uploadImageSite: build.mutation({
      query: (body) => ({
        url: `/site/upload`,
        method: "POST",
        body,
      }),
    }),
    getUploadImagesSite: build.query<any, void>({
      query: () => `/site/upload`,
    }),
  }),
});

export const {
  useGetOrgListsQuery,
  usePostOrganizationMutation,
  useGetSiteQuery,
  useEditSiteMutation,
  useUploadImageSiteMutation,
  useGetUploadImagesSiteQuery,
} = organizationsApi;
