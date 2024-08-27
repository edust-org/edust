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
import IsAuthenticated from "./is-authenticated";
import { CreateOrganization } from "@/organizations/features";
import { GrapesjsShadcnUI } from "@/lib/grapesjs-shadcn-ui";

const router: ReturnType<typeof createBrowserRouter> = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route
        index
        element={
          <Suspense fallback={<Loading.Spinner />}>
            <Home />
          </Suspense>
        }
      />
      <Route
        path="create-a-new-organizations"
        element={
          <IsAuthenticated>
            <Suspense fallback={<Loading.Spinner />}>
              <CreateOrganization />
            </Suspense>
          </IsAuthenticated>
        }
      />

      <Route path="grapesjs" element={<GrapesjsShadcnUI />} />

      <Route
        path="playground"
        element={
          <IsAuthenticated>
            <Suspense fallback={<Loading.Spinner />}>
              <Playground />
            </Suspense>
          </IsAuthenticated>
        }
      />

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
