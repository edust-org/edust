"use client"

import { useOrgSocketEvents, useSocketEvents } from "@/hooks"
import { useAuthMe } from "@/hooks/react-query"
import { PermissionValues } from "@/lib/pm"
import { useAuthStore } from "@/store"
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
  userFlags: null | {
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

  const { logOut, setAuthMe } = useAuthStore()

  const { data, isLoading, isError, error } = useAuthMe(
    status === "authenticated",
  )

  const user = data?.data || null

  useEffect(() => {
    if (user) {
      setAuthMe(user)
    }
  }, [user, setAuthMe])

  useEffect(() => {
    if (isError) {
      const statusCode = (error as AxiosError)?.response?.status
      const ERR_NETWORK = (error as AxiosError).code === "ERR_NETWORK"

      if (statusCode === 401 || statusCode === 403 || ERR_NETWORK) {
        logOut()
        router.push("/auth/login")
      }
    }
  }, [isError, error, setAuthMe, router, logOut])

  useSocketEvents()
  useOrgSocketEvents()

  return {
    data: data?.data || null,
    isLoading,
  }
}
