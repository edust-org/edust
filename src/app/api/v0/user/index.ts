import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiUrlV0 } from "@/app/api/axios-api-url";

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  is_verified: boolean;
  is_profile_verified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProfileResponse {
  data: {
    user: User;
  };
}

export const userApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${apiUrlV0}/user`,
    credentials: "include",
  }),

  reducerPath: "API_V0_userApi",
  tagTypes: ["User"],

  endpoints: (build) => ({
    getUser: build.query<ProfileResponse, void>({
      query: () => `/`,
    }),
  }),
});

export const { useGetUserQuery } = userApi;
