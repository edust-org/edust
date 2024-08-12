import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiUrlV0 } from "@/app/api/axios-api-url";

export const publicApi = createApi({
  reducerPath: "API_V0_publicApi",
  tagTypes: ["Public"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${apiUrlV0}/public`,
  }),
  endpoints: (build) => ({
    getOrgSitesPages: build.query({
      query: (orgIdOrUsername) => `/organizations/${orgIdOrUsername}/sites/`,
    }),
  }),
});

export const { useGetOrgSitesPagesQuery } = publicApi;
