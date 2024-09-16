import { createApi } from "@reduxjs/toolkit/query/react";
import { apiV0BaseQuery } from "../../api-url";

export const authApi = createApi({
  baseQuery: apiV0BaseQuery("/auth"),

  reducerPath: "API_V0_authApi",
  tagTypes: ["Auth"],

  endpoints: (build) => ({
    register: build.mutation({
      query: (body) => ({
        url: `/register`,
        method: "POST",
        body,
      }),
    }),
    verifyEmailByToken: build.mutation({
      query: (token) => ({
        url: `/verify/${token}`,
        method: "POST",
      }),
    }),
    login: build.mutation({
      query: (body) => ({
        url: `/login`,
        method: "POST",
        body,
      }),
    }),
    forgotPassword: build.mutation({
      query: (body) => ({
        url: `/forgot-password`,
        method: "POST",
        body,
      }),
    }),
    checkOtp: build.mutation({
      query: (body) => ({
        url: `/check-otp`,
        method: "POST",
        body,
      }),
    }),
    resetPassword: build.mutation({
      query: (body) => ({
        url: `/reset-password`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useVerifyEmailByTokenMutation,
  useLoginMutation,
  useForgotPasswordMutation,
  useCheckOtpMutation,
  useResetPasswordMutation,
} = authApi;
