import { createApi } from "@reduxjs/toolkit/query/react";
import { apiV0BaseQuery } from "../../api-url";

export const publicApi = createApi({
  baseQuery: apiV0BaseQuery("/public"),

  reducerPath: "API_V0_publicApi",
  tagTypes: ["Public"],

  endpoints: (build) => ({
    getOrgSitesPages: build.query({
      query: (orgIdOrUsername) => `/organizations/${orgIdOrUsername}/site/`,
    }),
  }),
});

export const { useGetOrgSitesPagesQuery } = publicApi;
