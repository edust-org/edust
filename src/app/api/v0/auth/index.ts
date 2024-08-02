import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiUrlV0 } from "@/app/api/axios-api-url";

export const authApi = createApi({
  reducerPath: "API_V0_authApi",
  tagTypes: ["Auth"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${apiUrlV0}/auth`,
    credentials: "include",
  }),

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
    logout: build.mutation<void, void>({
      query: () => ({
        url: `/logout`,
        method: "DELETE",
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
  useLogoutMutation,
  useForgotPasswordMutation,
  useCheckOtpMutation,
  useResetPasswordMutation,
} = authApi;
