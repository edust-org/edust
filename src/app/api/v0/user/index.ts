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
  reducerPath: "API_V0_userApi",
  tagTypes: ["User"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${apiUrlV0}/user`,
    credentials: "include",
  }),
  endpoints: (build) => ({
    userGet: build.query<ProfileResponse, void>({
      query: () => `/`,
    }),
  }),
});

export const { useUserGetQuery } = userApi;
