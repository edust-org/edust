"use client"

import { defaultValues } from "@/configs"
import axios from "@/lib/axios"
import { PermissionValues } from "@/lib/pm"
import { logOut, setAuthentication } from "@/lib/store/features"
import { useAppDispatch } from "@/lib/store/hooks"
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
  const dispatch = useAppDispatch()

  const { data, isLoading, isError, error } = useQuery<AuthMeData>({
    queryKey: ["authMe"],
    queryFn: async () => {
      const res = await axios.get(`${defaultValues.backendURL}/api/v0/auth/me`)
      return res.data?.data
    },
    enabled: status === "authenticated",
    retry: false,
  })

  useEffect(() => {
    if (data?.organizations) {
      dispatch(setAuthentication(data.organizations))
    }
  }, [data?.organizations, dispatch])

  useEffect(() => {
    if (isError) {
      const statusCode = (error as AxiosError)?.response?.status
      if (statusCode === 401 || statusCode === 403) {
        dispatch(logOut())
        router.push("/auth/login")
      }
    }
  }, [isError, error, dispatch, router])

  return {
    data,
    isLoading,
  }
}
