import Loading from "@/components/loading"
import { InstituteDetails, Institutes, Site } from "@/features"
import Authentication from "@/features/authentication"
import Dashboard from "@/features/dashboard"
import { AboutUs, ContactUs, Home, NotFound, Playground } from "@/pages"
import { Suspense } from "react"

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router"
import { ProtectedRoute } from "./protected-route"
import { Roles } from "@/types"

import PlayAppShell from "@/pages/playground/dashboard-v1/components/app-shell"

import V1Dashboard from "@/pages/playground/dashboard-v1/pages/dashboard"
import V1Task from "@/pages/playground/dashboard-v1/pages/tasks"
import { ComingSoon as V1CommingSoon } from "@/components/coming-soon"
import V1Settings from "@/pages/playground/dashboard-v1/pages/settings"
import V1SettingsProfile from "@/pages/playground/dashboard-v1/pages/settings/profile"
import V1SettingsAccount from "@/pages/playground/dashboard-v1/pages/settings/account"
import V1SettingsAppearance from "@/pages/playground/dashboard-v1/pages/settings/appearance"
import V1SettingsNotifications from "@/pages/playground/dashboard-v1/pages/settings/notifications"
import V1SettingsDisplay from "@/pages/playground/dashboard-v1/pages/settings/display"
import V1SettingsErrorEx from "@/pages/playground/dashboard-v1/pages/settings/error-example"

import V1GeneralError from "@/pages/playground/dashboard-v1/pages/errors/general-error"
import V1NotFoundError from "@/pages/playground/dashboard-v1/pages/errors/not-found-error"
import V1MaintenanceError from "@/pages/playground/dashboard-v1/pages/errors/maintenance-error"
import V1UnauthorisedError from "@/pages/playground/dashboard-v1/pages/errors/unauthorised-error"
import organizationRoutes from "./organization"

const router: ReturnType<typeof createBrowserRouter> = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" index element={<Home />} />

      {/* For Authentication routes */}
      <Route path="/auth">
        <Route path="register" element={<Authentication.Register />} />
        <Route
          path="verify/:token"
          element={<Authentication.VerifyEmailByToken />}
        />
        <Route path="login" element={<Authentication.Login />} />
        <Route
          path="forgot-password"
          element={<Authentication.ForgotPassword />}
        />

        <Route
          path="callback/:token"
          element={<Authentication.SocialAuthCallback />}
        />
      </Route>

      {/* For Guest or Public Routes */}

      <Route>
        <Route
          path="playground"
          element={
            <Suspense fallback={<Loading.Spinner />}>
              <Playground />
            </Suspense>
          }
        />

        <Route path="playground/dashboard" element={<PlayAppShell />}>
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
      </Route>

      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/contact-us" element={<ContactUs />} />
      <Route path="/u/:orgIdOrUsername/site" element={<Site />} />
      <Route path="/institutes" element={<Institutes />} />
      <Route
        path="/institutes/:id"
        element={
          <Suspense fallback={<Loading.Spinner />}>
            <InstituteDetails />
          </Suspense>
        }
      />

      {/* For Authenticated Users */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard.DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="" element={<Dashboard.DashboardMain />}></Route>
        <Route
          path="institutes"
          element={<Dashboard.InstitutesLists />}
        ></Route>
        <Route
          path="institutes/create"
          element={<Dashboard.InstitutesCreate />}
        />
        <Route
          path="institutes/lists"
          element={<Dashboard.InstitutesLists />}
        />
      </Route>
      {organizationRoutes}
      <Route path="*" index element={<NotFound />} />
    </Route>,
  ),
)

export default router
