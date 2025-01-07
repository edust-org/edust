import { Suspense } from "react"
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router"

import Loading from "@/components/loading"
import { InstituteDetails, Institutes, Site } from "@/features"
import Authentication from "@/features/authentication"
import Dashboard from "@/features/dashboard"
import { AboutUs, ContactUs, Home, NotFound } from "@/pages"

import { ProtectedRoute } from "./protected-route"

import organizationRoutes from "./organization-routes"
import playgroundRoutes from "./playground-routes"

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
      {playgroundRoutes}
      <Route path="*" index element={<NotFound />} />
    </Route>,
  ),
)

export default router
