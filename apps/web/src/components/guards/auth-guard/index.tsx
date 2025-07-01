"use client"

import { Loading } from "@/components/loading"
import { PermissionValues } from "@/lib/pm"
import { useAuthStore } from "@/store"
import { Typography } from "@edust/ui"
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
  const state = useAuthStore()
  const activeOrg = state.getActiveOrg()

  const userPermissions = useMemo(
    () => activeOrg?.rolePermissions || [],
    [activeOrg],
  )
  const { isLoading } = useGetAuthMe()

  const hasRequiredPermissions = useMemo(() => {
    if (!requiredPermissions) return true

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

  // Show children for:
  // - Authenticated users with proper permissions
  // - Unauthenticated users if no permissions are required
  return <>{children}</>
}
