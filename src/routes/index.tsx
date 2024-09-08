import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import { Home, NotFound, Playground } from "@/pages";

import Authentication from "@/features/authentication";
import { InstituteDetails, Institutes, Site } from "@/features";
import { Suspense } from "react";
import Loading from "@/components/loading";
import organizationRoutes from "./organization-routes";
import IsAuthenticated from "./is-authenticated";
import { CreateOrganization } from "@/organizations/features";
import { GrapesjsShadcnUI } from "@/lib/grapesjs-shadcn-ui";
import Dashboard from "@/features/dashboard";

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
        path="/dashboard"
        element={
          <IsAuthenticated>
            <Suspense fallback={<Loading.Spinner />}>
              <Dashboard.DashboardLayout />
            </Suspense>
          </IsAuthenticated>
        }
      >
        <Route
          path="institutes"
          element={
            <Suspense fallback={<Loading.Spinner />}>
              <h1>Institutes</h1>
            </Suspense>
          }
        ></Route>
        <Route
          path="institutes/create"
          element={
            <Suspense fallback={<Loading.Spinner />}>
              <Dashboard.InstitutesCreate />
            </Suspense>
          }
        />
        <Route
          path="institutes/lists"
          element={
            <Suspense fallback={<Loading.Spinner />}>
              <Dashboard.InstitutesLists />
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
          <Suspense fallback={<Loading.Spinner />}>
            <Playground />
          </Suspense>
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

      <Route path=":orgIdOrUsername/site" element={<Site />} />
      {/* TODO: route

        /profile/:id
        /{org-user}/:id
        /{user}/:id 
      */}

      <Route path="*" element={<NotFound />} />
      {organizationRoutes}
    </Route>,
  ),
);

export default router;
