import { createApi } from "@reduxjs/toolkit/query/react";
import { apiV0BaseQuery } from "../../api-url";

export const publicApi = createApi({
  baseQuery: apiV0BaseQuery("/public"),

  reducerPath: "API_V0_publicApi",
  tagTypes: ["Public"],

  endpoints: (build) => ({
    getOrgSitesPages: build.query({
      query: ({ orgIdOrUsername, filters }) => {
        const queryParams = new URLSearchParams(filters).toString();
        return `/organizations/${orgIdOrUsername}/site/?${queryParams}`;
      },
    }),
    getInstitutes: build.query({
      query: ({ filters }) => {
        const queryParams = new URLSearchParams(filters).toString();
        return `/institutes?${queryParams}`;
      },
    }),
    getInstituteById: build.query({
      query: (id) => {
        return `/institutes/${id}`;
      },
    }),
    getInstitutesCategories: build.query({
      query: () => {
        return `/institutes/categories`;
      },
    }),
  }),
});

export const {
  useGetOrgSitesPagesQuery,
  useGetInstitutesQuery,
  useGetInstituteByIdQuery,
  useGetInstitutesCategoriesQuery,
} = publicApi;
