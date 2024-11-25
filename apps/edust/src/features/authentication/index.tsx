import { lazy } from "react"

const Register = lazy(() =>
  import("./register").then((module) => ({ default: module.Register })),
)
const Login = lazy(() =>
  import("./login").then((module) => ({ default: module.Login })),
)
const VerifyEmailByToken = lazy(() =>
  import("./verify-email-by-token").then((module) => ({
    default: module.VerifyEmailByToken,
  })),
)
const ForgotPassword = lazy(() =>
  import("./forgot-password").then((module) => ({
    default: module.ForgotPassword,
  })),
)
const SocialAuthCallback = lazy(() =>
  import("./social-auth-callback").then((module) => ({
    default: module.SocialAuthCallback,
  })),
)

const Authentication = {
  Register,
  Login,
  VerifyEmailByToken,
  ForgotPassword,
  SocialAuthCallback,
}

export default Authentication
