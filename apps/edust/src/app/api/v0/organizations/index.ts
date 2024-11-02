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

    // site-builder
    editSiteBuilder: build.mutation({
      query: (body) => ({
        url: `/site-builder`,
        method: "PATCH",
        body,
      }),
    }),
    getSiteBuilderMe: build.query<any, void>({
      query: () => `/site-builder/me`,
    }),

    uploadImageSiteBuilder: build.mutation({
      query: (body) => ({
        url: `/site-builder/images`,
        method: "POST",
        body,
      }),
    }),

    getUploadImagesSiteBuilderMe: build.query<any, void>({
      query: () => `/site-builder/images/me`,
    }),

    deleteUploadImagesByIdSiteBuilder: build.mutation<{ success: boolean; id: number }, number>({
      query(id) {
        return {
          url: `/site-builder/images/${id}`,
          method: 'DELETE',
        }
      },
    }),
  }),
});

export const {
  useGetOrgListsQuery,
  usePostOrganizationMutation,
  useGetSiteBuilderMeQuery,
  useEditSiteBuilderMutation,
  useGetUploadImagesSiteBuilderMeQuery,
  useDeleteUploadImagesByIdSiteBuilderMutation
} = organizationsApi;
