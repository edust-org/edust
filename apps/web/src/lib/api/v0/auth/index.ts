import { defaultValues } from "@/configs"
import axios from "@/lib/axios"

import { AuthMeResponse } from "./auth-type"

const BASE_URL = `${defaultValues.apiV0URL}/auth`

export const login = async (body: any): Promise<any> => {
  const response = await axios.post(`${BASE_URL}/login`, body)
  return response.data
}

export const getAuthMe = async (): Promise<AuthMeResponse> => {
  const response = await axios.get(`${BASE_URL}/me`)
  return response.data
}

export const register = async (body: any): Promise<any> => {
  const response = await axios.post(`${BASE_URL}/register`, body)
  return response.data
}

export const verifyEmailByToken = async (token: string): Promise<any> => {
  const response = await axios.post(`${BASE_URL}/verify-account/${token}`)
  return response.data
}

export const forgotPassword = async (body: any): Promise<any> => {
  const response = await axios.post(`${BASE_URL}/forgot-password`, body)
  return response.data
}

export const checkOtp = async (body: any): Promise<any> => {
  const response = await axios.post(`${BASE_URL}/check-otp`, body)
  return response.data
}

export const resetPassword = async (body: any): Promise<any> => {
  const response = await axios.post(`${BASE_URL}/reset-password`, body)
  return response.data
}

export * from "./auth-type"
