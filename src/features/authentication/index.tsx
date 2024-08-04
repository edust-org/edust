import { lazy } from "react";

const SignUp = lazy(() =>
  import("./sign-up").then((module) => ({ default: module.SignUp }))
);
const SignIn = lazy(() =>
  import("./sign-in").then((module) => ({ default: module.SignIn }))
);
const VerifyEmailByToken = lazy(() =>
  import("./verify-email-by-token").then((module) => ({
    default: module.VerifyEmailByToken,
  }))
);

const Authentication = { SignUp, SignIn, VerifyEmailByToken };

export default Authentication;
