import { useSearchParams } from "react-router"
import { VerifyOtp } from "./verify-otp"
import { ResetWithNewPassword } from "./reset-with-new-password"
import { SendOtpUsingEmail } from "./send-otp-using-email"

export const ForgotPassword = () => {
  const [searchParams] = useSearchParams()
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
