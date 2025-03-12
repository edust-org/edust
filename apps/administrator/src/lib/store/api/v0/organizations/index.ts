import { createApi } from "@reduxjs/toolkit/query/react"

import { apiV0BaseQuery } from "../../api-url"

export const organizationsApi = createApi({
  baseQuery: apiV0BaseQuery("/organizations"),

  reducerPath: "API_V0_OrganizationsApi",
  tagTypes: ["Organizations"],

  endpoints: (build) => ({
    // me
    getOrgMe: build.query<any, void>({
      query: () => `/me`,
    }),

    // org
    createOrganization: build.mutation({
      query: (body) => ({
        url: `/`,
        method: "POST",
        body,
      }),
    }),
    getOrgLists: build.query<any, void>({
      query: () => `/`,
    }),

    // site-builder/images
    uploadSiteBuilderImage: build.mutation({
      query: ({ orgId, body }) => ({
        url: `/${orgId}/site-builder/images`,
        method: "POST",
        body,
      }),
    }),

    getSiteBuilderImages: build.query<any, string>({
      query: (orgId) => `/${orgId}/site-builder/images`,
    }),

    editSiteBuilderImagesById: build.mutation<
      any,
      { orgId: string; imageId: string; body: any }
    >({
      query({ orgId, imageId, body }) {
        return {
          url: `/${orgId}/site-builder/images/${imageId}`,
          method: "PATCH",
          body,
        }
      },
    }),

    deleteSiteBuilderImagesById: build.mutation<
      any,
      { orgId: string; imageId: string }
    >({
      query({ orgId, imageId }) {
        return {
          url: `/${orgId}/site-builder/images/${imageId}`,
          method: "DELETE",
        }
      },
    }),

    // site page
    addSitePage: build.mutation<
      any,
      {
        orgId: string
        body: { id: string; pageName: string; html: string; css: string }
      }
    >({
      query: ({ orgId, body }) => ({
        url: `/${orgId}/site-builder/pages`,
        method: "POST",
        body,
      }),
    }),

    updateSitePageName: build.mutation<
      any,
      { orgId: string; pageId: string; pageName: string }
    >({
      query: ({ orgId, pageId, pageName }) => ({
        url: `/${orgId}/site-builder/pages/${pageId}`,
        method: "PATCH",
        body: { pageName },
      }),
    }),

    deleteSitePage: build.mutation<any, { orgId: string; pageId: string }>({
      query: ({ orgId, pageId }) => ({
        url: `/${orgId}/site-builder/pages/${pageId}`,
        method: "DELETE",
      }),
    }),

    // site-builder
    createSiteBuilder: build.mutation<any, { orgId: string; body: any }>({
      query: ({ orgId, body }) => ({
        url: `/${orgId}/site-builder`,
        method: "POST",
        body,
      }),
    }),

    getSiteBuilder: build.query<any, string>({
      query: (orgId) => `/${orgId}/site-builder`,
    }),

    editSiteBuilder: build.mutation({
      query: ({ orgId, body }) => ({
        url: `/${orgId}/site-builder`,
        method: "PATCH",
        body,
      }),
    }),
  }),
})

export const {
  useGetOrgMeQuery,

  useCreateOrganizationMutation,
  useGetOrgListsQuery,

  useUploadSiteBuilderImageMutation,
  useGetSiteBuilderImagesQuery,
  useLazyGetSiteBuilderImagesQuery,
  useEditSiteBuilderImagesByIdMutation,
  useDeleteSiteBuilderImagesByIdMutation,

  useAddSitePageMutation,
  useUpdateSitePageNameMutation,
  useDeleteSitePageMutation,

  useCreateSiteBuilderMutation,
  useGetSiteBuilderQuery,
  useLazyGetSiteBuilderQuery,
  useEditSiteBuilderMutation,
} = organizationsApi
