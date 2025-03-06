"use client"

import { setAuthentication } from "@/lib/store/features"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { getCookie } from "cookies-next/client"
import { useParams, useRouter } from "next/navigation"
import { toast } from "sonner"

import { useEffect } from "react"

export default function Callback() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const params = useParams()
  const accessToken = params.accessToken

  const authState = useAppSelector((state) => state.authentication)

  useEffect(() => {
    const data = JSON.parse(getCookie("user") || "{}")

    if (accessToken && data) {
      dispatch(
        setAuthentication({
          ...authState,
          isAuthenticated: true,
          isLoading: false,
          user: data?.data,
          auth: {
            accessToken: data?.auth.token,
            expiresAt: data?.auth.expiresAt,
          },
        }),
      )

      toast.success(data?.message)
      router.back()
    } else {
      // Redirect to login or home if token is not present
      router.push("/auth/login")
    }
  }, [accessToken, dispatch, authState, router])

  return <div>Loading...</div>
}
