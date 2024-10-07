import { createApi } from "@reduxjs/toolkit/query/react";
import { apiV0BaseQuery } from "../../api-url";

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

export interface Organization {
  id: string;
  name: string;
  org_username: string;
  is_profile_verified: boolean;
  role: string;
}

export interface ProfileResponse {
  data: {
    organization: Organization | null;
    user: User;
  };
}

export const userApi = createApi({
  baseQuery: apiV0BaseQuery("/user"),

  reducerPath: "API_V0_userApi",
  tagTypes: ["User"],

  endpoints: (build) => ({
    getUser: build.query<ProfileResponse, void>({
      query: () => `/self`,
    }),
  }),
});

export const { useGetUserQuery } = userApi;
