import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import { Home, NotFound, Playground } from "@/pages";

import Authentication from "@/features/authentication";
import { Sites } from "@/features";
import { Suspense } from "react";
import Loading from "@/components/loading";
import organizationRoutes from "./organization-routes";

const router: ReturnType<typeof createBrowserRouter> = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index element={<Home />} />
      <Route path="playground" element={<Playground />} />

      {/* For auth routes */}
      <Route path="auth">
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
      </Route>

      <Route path=":orgIdOrUsername/sites" element={<Sites />} />

      <Route path="*" element={<NotFound />} />
      {organizationRoutes}
    </Route>
  )
);

export default router;
