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
import AppShell from "@/pages/playground/dashboard-v1/components/app-shell";

import V1Dashboard from "@/pages/playground/dashboard-v1/pages/dashboard";
import V1Task from "@/pages/playground/dashboard-v1/pages/tasks";
import V1CommingSoon from "@/pages/playground/dashboard-v1/components/coming-soon";
import V1Settings from "@/pages/playground/dashboard-v1/pages/settings";
import V1SettingsProfile from "@/pages/playground/dashboard-v1/pages/settings/profile";
import V1SettingsAccount from "@/pages/playground/dashboard-v1/pages/settings/account";
import V1SettingsAppearance from "@/pages/playground/dashboard-v1/pages/settings/appearance";
import V1SettingsNotifications from "@/pages/playground/dashboard-v1/pages/settings/notifications";
import V1SettingsDisplay from "@/pages/playground/dashboard-v1/pages/settings/display";
import V1SettingsErrorEx from "@/pages/playground/dashboard-v1/pages/settings/error-example";

import V1GeneralError from "@/pages/playground/dashboard-v1/pages/errors/general-error";
import V1NotFoundError from "@/pages/playground/dashboard-v1/pages/errors/not-found-error";
import V1MaintenanceError from "@/pages/playground/dashboard-v1/pages/errors/maintenance-error";
import V1UnauthorisedError from "@/pages/playground/dashboard-v1/pages/errors/unauthorised-error";

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
          path=""
          element={
            <Suspense fallback={<Loading.Spinner />}>
              <Dashboard.DashboardMain />
            </Suspense>
          }
        ></Route>
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
      <Route path="playground/dashboard" element={<AppShell />}>
        <Route index element={<V1Dashboard />} />
        <Route path="tasks" element={<V1Task />} />
        <Route path="users" element={<V1CommingSoon />} />
        <Route path="settings" element={<V1Settings />}>
          <Route index element={<V1SettingsProfile />} />
          <Route path="account" element={<V1SettingsAccount />} />
          <Route path="appearance" element={<V1SettingsAppearance />} />
          <Route path="notifications" element={<V1SettingsNotifications />} />
          <Route path="display" element={<V1SettingsDisplay />} />
          <Route path="error-example" element={<V1SettingsErrorEx />} />
        </Route>
      </Route>
      <Route path="/500" element={<V1GeneralError />} />
      <Route path="/404" element={<V1NotFoundError />} />
      <Route path="/503" element={<V1MaintenanceError />} />
      <Route path="/401" element={<V1UnauthorisedError />} />

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

        <Route
          path="callback/:access_token"
          element={
            <Suspense fallback={<Loading.Spinner />}>
              <Authentication.SocialAuthCallback />
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
