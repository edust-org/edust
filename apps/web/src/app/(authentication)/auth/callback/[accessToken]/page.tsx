"use client"

import { FullSpinner } from "@/components"
import { signIn, useSession } from "next-auth/react"
import { useParams, useRouter } from "next/navigation"
import { toast } from "sonner"

import { useEffect } from "react"

export default function Callback() {
  const { status } = useSession()
  const params = useParams()
  const router = useRouter()
  const accessCredentialToken = params.accessToken as string | undefined

  useEffect(() => {
    if (!accessCredentialToken) {
      // If no access token, stop execution early
      return
    }

    if (status === "authenticated") {
      // If user is authenticated, redirect to home
      return router.push("/")
    }

    const socialLogin = async (token: string) => {
      try {
        const result = await signIn("SOCIAL_LOGIN", {
          accessCredentialToken: token,
          redirect: false,
        })

        if (result?.error) {
          router.push("/auth/login")
          toast.error(result?.error)
        } else if (result?.ok) {
          router.push("/")
        }
      } catch (error) {
        router.push("/auth/login")
        const errorMessage =
          error instanceof Error
            ? error.message
            : "An unexpected error occurred"
        toast.error(errorMessage)
      }
    }

    socialLogin(accessCredentialToken)
  }, [accessCredentialToken, router, status])

  return <FullSpinner />
}
