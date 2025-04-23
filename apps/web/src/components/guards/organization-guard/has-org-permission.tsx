import { Button, Typography } from "@/components/ui"
import { PermissionValues } from "@/lib/pm"
import { selectActiveOrg } from "@/lib/store/features"
import { useAppSelector } from "@/lib/store/hooks"
import { useRouter } from "next/navigation"

import React, { ReactNode, useMemo } from "react"

interface HasPermissionProps {
  children: ReactNode
  requiredPermissions: PermissionValues | PermissionValues[]
  fallback?: ReactNode | null | boolean
}

export const HasOrgPermission: React.FC<HasPermissionProps> = ({
  children,
  requiredPermissions,
  fallback = null,
}) => {
  const router = useRouter()
  const state = useAppSelector((state) => state.authentication)
  const activeOrg = selectActiveOrg(state)

  const userPermissions = useMemo(() => {
    return activeOrg?.rolePermissions || []
  }, [activeOrg])

  const isAllowed = useMemo(() => {
    if (Array.isArray(requiredPermissions)) {
      return requiredPermissions.every((p) => userPermissions.includes(p))
    }
    return userPermissions.includes(requiredPermissions)
  }, [userPermissions, requiredPermissions])

  if (!isAllowed) {
    if (fallback) {
      return fallback
    }

    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <Typography variant="h2" className="text-destructive">
          Unauthorized to access!
        </Typography>
        <Button onClick={() => router.push("/")}>Back to home</Button>
      </div>
    )
  }

  return <>{children}</>
}
