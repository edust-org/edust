// hooks/useAuthGuard.ts
import { defaultValues } from "@/configs"
import axios from "@/lib/axios"
import { logOut, setAuthentication } from "@/lib/store/features"
import { Organization } from "@/lib/store/features"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

import { useEffect, useState } from "react"

export interface OrgRole {
  id: string
  organization: {
    id: string
    name: string
  }
  role: string
  rolePermissions: string[]
}

export const useOrganizationGuard = () => {
  const { status } = useSession()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const authState = useAppSelector((state) => state.authentication)
  const [isVerifying, setIsVerifying] = useState(true)

  useEffect(() => {
    const verifyAuth = async () => {
      if (status === "unauthenticated") {
        dispatch(logOut())
        router.push("/auth/login")
        return
      }

      if (status === "authenticated" && !authState.organizations?.length) {
        try {
          const { data } = await axios.get(
            `${defaultValues.backendURL}/api/v0/auth/me`,
          )

          const org: Organization[] =
            data?.organizationRoles?.map((orgRole: OrgRole) => ({
              id: orgRole.organization.id,
              name: orgRole.organization.name,
              role: {
                id: orgRole.id,
                name: orgRole.role,
                permissions: orgRole.rolePermissions,
              },
            })) || []

          dispatch(setAuthentication(org))
        } catch (error) {
          console.error("Failed to verify user:", error)
          dispatch(logOut())
          router.push("/auth/login")
        } finally {
          setIsVerifying(false)
        }
      } else {
        setIsVerifying(false)
      }
    }

    verifyAuth()
  }, [status, authState.organizations?.length, dispatch, router])

  return {
    isLoading: status === "loading" || isVerifying,
    isAuthenticated:
      status === "authenticated" && !!authState.organizations?.length,
  }
}
