import { Route } from "react-router"
import { ProtectedRoute } from "./protected-route"
import { Roles } from "@/types"
import { AppShell } from "@/organizations"
import {
  AccessControl,
  Dashboard,
  Site,
  SiteBuilder,
} from "@/organizations/features"
import { Suspense } from "react"
import Loading from "@/components/loading"

export default (
  <>
    <Route
      path="/organizations"
      element={
        <ProtectedRoute roles={[Roles.OWNER]}>
          <AppShell />
        </ProtectedRoute>
      }
    >
      <Route index element={<Dashboard />} />
      <Route
        path="site"
        element={
          <Suspense fallback={<Loading.Spinner />}>
            <Site />
          </Suspense>
        }
      />
      {/* <Route
        path="site"
        element={
          <Suspense fallback={<Loading.Spinner />}>
            <Site />
          </Suspense>
        }
      />
      <Route path="access-control" element={<AccessControl />} />
      <Route
        path="settings"
        element={
          <ProtectedRoute roles={[Roles.OWNER]}>
            <h1>Setting</h1>
          </ProtectedRoute>
        }
      />
      <Route
        path="site/builder"
        element={
          <ProtectedRoute roles={[Roles.OWNER]}>
            <SiteBuilder />
          </ProtectedRoute>
        }
      /> */}
    </Route>
  </>
)
