import api from "@/lib/api"
import { ApiResponse, AuthMe } from "@/types"
import { useMutation, useQuery } from "@tanstack/react-query"

import { useState } from "react"

export const useLogin = () =>
  useMutation({
    mutationFn: api.v0.login,
  })

export const useRegister = () =>
  useMutation({
    mutationFn: api.v0.register,
  })

export const useAuthMe = (isEnabled = true) => {
  const [enabled, setEnabled] = useState(isEnabled)

  const query = useQuery<ApiResponse<AuthMe>>({
    queryKey: ["authMe"],
    queryFn: api.v0.getAuthMe,
    enabled,
  })

  const trigger = () => setEnabled(true)

  return { ...query, trigger }
}

export const useVerifyEmailByToken = () =>
  useMutation({
    mutationFn: api.v0.verifyEmailByToken,
  })

export const useForgotPassword = () =>
  useMutation({
    mutationFn: api.v0.forgotPassword,
  })

export const useCheckOtp = () =>
  useMutation({
    mutationFn: api.v0.checkOtp,
  })

export const useResetPassword = () =>
  useMutation({
    mutationFn: api.v0.resetPassword,
  })
