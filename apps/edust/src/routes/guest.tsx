import Loading from "@/components/loading";
import { InstituteDetails, Institutes } from "@/features";
import Authentication from "@/features/authentication";
import { GuestHome } from "@/pages/home";
import { Suspense } from "react";
import { Route } from "react-router-dom";

export const guestRoutes = (
  <Route>
    <Route
      path="/"
      element={
        <Suspense fallback={<Loading.Spinner />}>
          <GuestHome />
        </Suspense>
      }
    />

    {/* For auth routes */}
    <Route path="/auth">
      <Route
        path="sign-up"
        element={
          <Suspense fallback={<Loading.Spinner />}>
            <Authentication.SignUp />
          </Suspense>
        }
      />
      <Route
        path="verify/:token"
        element={
          <Suspense fallback={<Loading.Spinner />}>
            <Authentication.VerifyEmailByToken />
          </Suspense>
        }
      />
      <Route
        path="sign-in"
        element={
          <Suspense fallback={<Loading.Spinner />}>
            <Authentication.SignIn />
          </Suspense>
        }
      />
      <Route
        path="forgot-password"
        element={
          <Suspense fallback={<Loading.Spinner />}>
            <Authentication.ForgotPassword />
          </Suspense>
        }
      />

      <Route
        path="callback/:access_token"
        element={
          <Suspense fallback={<Loading.Spinner />}>
            <Authentication.SocialAuthCallback />
          </Suspense>
        }
      />
    </Route>

    <Route
      path="/institutes"
      element={
        <Suspense fallback={<Loading.Spinner />}>
          <Institutes />
        </Suspense>
      }
    />
    <Route
      path="/institutes/:id"
      element={
        <Suspense fallback={<Loading.Spinner />}>
          <InstituteDetails />
        </Suspense>
      }
    />
  </Route>
);
