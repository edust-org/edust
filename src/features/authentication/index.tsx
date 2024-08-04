// Authentication.tsx (or Authentication.js)
import React, { Suspense, lazy } from "react";

// Lazy load components
const SignUp = lazy(() => import("./sign-up"));
const SignIn = lazy(() =>
  import("./sign-in").then((module) => ({ default: module.SignIn }))
);

const VerifyEmailByToken = lazy(() => import("./verify-email-by-token"));

<Suspense fallback={"LOADING"}>
 <SignIn />
</Suspense>

// Exporting lazy-loaded components
export { SignUp, SignIn, VerifyEmailByToken };
