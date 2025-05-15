"use client"

import { Loading } from "@/components/loading"
import { Typography } from "@/components/ui"
import { PermissionValues } from "@/lib/pm"
import { useAuthStore } from "@/store"
import { useSession } from "next-auth/react"

import React, { useMemo } from "react"

import { useGetAuthMe } from "./use-get-auth-me"

export type AuthGuardProps = {
  children: React.ReactNode
  requiredPermissions?: PermissionValues | PermissionValues[]
  fallback?: React.ReactNode
}

export const AuthGuard: React.FC<AuthGuardProps> = ({
  children,
  requiredPermissions,
  fallback = null,
}) => {
  const { status } = useSession()
  const { user } = useAuthStore()

  const { isLoading } = useGetAuthMe()

  const userPermissions = useMemo(
    () => user?.systemRole.rolePermissions,
    [user],
  )

  const hasRequiredPermissions = useMemo(() => {
    if (!requiredPermissions) return true
    if (!userPermissions) return false

    const required = Array.isArray(requiredPermissions)
      ? requiredPermissions
      : [requiredPermissions]

    return required.some((p) => userPermissions.includes(p))
  }, [userPermissions, requiredPermissions])

  if (status === "loading" || isLoading) {
    return <Loading.FullScreen />
  }

  // Authenticated users with missing permissions
  if (
    (status === "authenticated" || requiredPermissions) &&
    !hasRequiredPermissions
  ) {
    return (
      fallback ?? (
        <div className="flex h-screen flex-col items-center justify-center">
          <Typography variant="h2" className="text-destructive">
            Unauthorized to access!
          </Typography>
        </div>
      )
    )
  }

  return <>{children}</>
}
