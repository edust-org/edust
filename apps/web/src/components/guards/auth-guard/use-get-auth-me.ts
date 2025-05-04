"use client"

import { defaultValues } from "@/configs"
import { useAuthMe } from "@/hooks/react-query"
import axios from "@/lib/axios"
import { PermissionValues } from "@/lib/pm"
import { useAuthStore } from "@/lib/store"
import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

import { useEffect } from "react"

type Organization = {
  id: string
  name: string
  orgUsername: string
  profilePic: string | null
  roleId: string
  role: string
  rolePermissions: PermissionValues[]
}

export interface AuthMeData {
  id: string
  name: string
  username: string | null
  email: string
  profilePic: string
  hasRoles: null | {
    organization?: boolean
    system?: boolean
  }
  createdAt: string
  updatedAt: string
  systemRole: string | null
  organizations: Organization[] | null
}

export function useGetAuthMe() {
  const { status } = useSession()
  const router = useRouter()

  const { logOut, setAuthentication } = useAuthStore()

  const { data, isLoading, isError, error } = useAuthMe(
    status === "authenticated",
  )

  useEffect(() => {
    if (data?.data?.organizations) {
      setAuthentication(data.data.organizations)
    }
  }, [data?.data.organizations, setAuthentication])

  useEffect(() => {
    if (isError) {
      const statusCode = (error as AxiosError)?.response?.status
      if (statusCode === 401 || statusCode === 403) {
        logOut()
        router.push("/auth/login")
      }
    }
  }, [isError, error, setAuthentication, router, logOut])

  return {
    data: data?.data || null,
    isLoading,
  }
}
