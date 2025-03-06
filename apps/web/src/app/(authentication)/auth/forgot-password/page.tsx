"use client"

import { useSearchParams } from "next/navigation"

import { ResetWithNewPassword } from "../../components/reset-with-new-password"
import { SendOtpUsingEmail } from "../../components/send-otp-using-email"
import { VerifyOtp } from "../../components/verify-otp"

export default function ForgotPassword() {
  const searchParams = useSearchParams()
  const step = searchParams.get("step")

  switch (step) {
    // Step 2
    case "verify-otp":
      return <VerifyOtp />

    // Step 3
    case "reset-password":
      return <ResetWithNewPassword />

    // Step 1
    default:
      return <SendOtpUsingEmail />
  }
}
