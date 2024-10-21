import { lazy } from "react";

const SignUp = lazy(() =>
  import("./sign-up").then((module) => ({ default: module.SignUp })),
);
const SignIn = lazy(() =>
  import("./sign-in").then((module) => ({ default: module.SignIn })),
);
const VerifyEmailByToken = lazy(() =>
  import("./verify-email-by-token").then((module) => ({
    default: module.VerifyEmailByToken,
  })),
);
const ForgotPassword = lazy(() =>
  import("./forgot-password").then((module) => ({
    default: module.ForgotPassword,
  })),
);
const SocialAuthCallback = lazy(() =>
  import("./social-auth-callback").then((module) => ({
    default: module.SocialAuthCallback,
  })),
);

const Authentication = {
  SignUp,
  SignIn,
  VerifyEmailByToken,
  ForgotPassword,
  SocialAuthCallback,
};

export default Authentication;
