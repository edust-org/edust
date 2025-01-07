import { Roles } from "@/types"
import { FC, ReactNode } from "react"

import { Navigate, useLocation } from "react-router"
import { useAppSelector } from "@/app/hooks"

interface ProtectedRouteProps {
  roles?: Roles[]
  children: ReactNode
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  roles = [],
  children,
}) => {
  const { isAuthenticated, user } = useAppSelector(
    (state) => state.authentication,
  )
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />
  }
  const role = user?.organizationRoles?.map((role) => role.role) || []

  if (roles.length > 0 && !roles.includes(role && role[0])) {
    return <Navigate to="/auth/login" replace />
  }

  return children
}
