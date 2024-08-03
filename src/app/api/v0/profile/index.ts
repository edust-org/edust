import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiUrlV0 } from "@/app/api/axios-api-url";

export const profileApi = createApi({
  reducerPath: "API_V0_profileApi",
  tagTypes: ["Profile"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${apiUrlV0}/profile`,
    credentials: "include",
  }),
  endpoints: (build) => ({
    getProfile: build.query({
      query: () => `/profile`,
    }),
  }),
});

export const { useGetProfileQuery } = profileApi;
