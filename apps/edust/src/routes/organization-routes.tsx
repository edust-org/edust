import { Route } from "react-router"
import { ProtectedRoute } from "./protected-route"
import { Roles } from "@/types"
import { AppShell } from "@/organizations"
import {
  CreateOrganization,
  Dashboard,
  Site,
  SiteBuilder,
} from "@/organizations/features"
import { Suspense } from "react"
import Loading from "@/components/loading"

export default (
  <>
    <Route
      path="/organizations/create"
      element={
        <ProtectedRoute>
          <CreateOrganization />
        </ProtectedRoute>
      }
    />
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
    </Route>
    <Route
      path="/organizations/site/builder"
      element={
        <ProtectedRoute roles={[Roles.OWNER]}>
          <SiteBuilder />
        </ProtectedRoute>
      }
    />
  </>
)
