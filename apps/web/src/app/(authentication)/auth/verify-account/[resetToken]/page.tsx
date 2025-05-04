"use client"

// import assets from "@/assets/images"
import { Typography } from "@/components/ui"
import { useVerifyEmailByToken } from "@/hooks/react-query"
import { useParams, useRouter } from "next/navigation"
import { BeatLoader } from "react-spinners"
import { toast } from "sonner"

import React, { useEffect } from "react"

export default function VerifyAccount() {
  const params = useParams()

  const {
    mutateAsync: verify,
    isPending: isLoading,
    isError,
  } = useVerifyEmailByToken()

  const router = useRouter()

  useEffect(() => {
    if (params.resetToken) {
      verify(params.resetToken as string)
        .then((res) => {
          if (res?.status) {
            toast.success(res?.message)

            router.push("/auth/login")
          }
        })
        .catch((error) => {
          if (error?.data?.error) {
            toast.error(error?.data?.error)
          }
        })
    }
  }, [router, params.resetToken, verify])

  return (
    <div className="flex h-screen items-center justify-center p-4">
      <div className="w-full p-4 shadow sm:max-w-96 md:max-w-[450px] md:p-6">
        <div className="space-y-4 text-center">
          {/* <img src={assets.logoLight} alt="" className="mx-auto" width={250} /> */}
          <div className="space-y-2">
            <Typography variant="h3">Verifying Your Account</Typography>
            {isLoading && <BeatLoader />}
          </div>
          {!isError && <Typography>Working for verification</Typography>}
          {isError && (
            <Typography className="text-red-500">
              Close this tab and Please Try again!
            </Typography>
          )}
        </div>
      </div>
    </div>
  )
}
