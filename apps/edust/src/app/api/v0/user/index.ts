import { createApi } from "@reduxjs/toolkit/query/react";
import { apiV0BaseQuery } from "../../api-url";
import { Organization, User } from "@/types";

export interface ProfileResponse {
  data: {
    organization: Organization[] | null;
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
