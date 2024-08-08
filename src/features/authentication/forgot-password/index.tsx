import { lazy } from "react";
import { useSearchParams } from "react-router-dom";

const SendOtpUsingEmail = lazy(() =>
  import("./send-otp-using-email").then((module) => ({
    default: module.SendOtpUsingEmail,
  }))
);
const VerifyOtp = lazy(() =>
  import("./verify-otp").then((module) => ({
    default: module.VerifyOtp,
  }))
);

const ResetWithNewPassword = lazy(() =>
  import("./reset-with-new-password").then((module) => ({
    default: module.ResetWithNewPassword,
  }))
);

export const ForgotPassword = () => {
  const [searchParams] = useSearchParams();
  const step = searchParams.get("step");

  switch (step) {
    // Step 2
    case "verify-otp":
      return <VerifyOtp />;

    // Step 3
    case "reset-password":
      return <ResetWithNewPassword />;

    // Step 1
    default:
      return <SendOtpUsingEmail />;
  }
};
