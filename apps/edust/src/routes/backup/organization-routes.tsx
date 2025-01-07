import {
  AccessControl,
  Dashboard,
  Site,
  SiteBuilder,
} from "@/organizations/features"
import { Route } from "react-router"
import { Suspense } from "react"
import Loading from "@/components/loading"
import { Roles } from "@/types"
import { AppShell } from "@/organizations"
import { Protector } from "./protector"

export const organizationRoutes = (
  <Route>
    <Route
      path="/"
      element={
        <Protector roles={[Roles.OWNER, Roles.EDITOR]}>
          <AppShell />
        </Protector>
      }
    >
      <Route path="" element={<Dashboard />} />
      <Route
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
          <Protector roles={[Roles.OWNER, Roles.EDITOR]}>
            <h1>Setting</h1>
          </Protector>
        }
      />
    </Route>
    <Route
      path="/site/builder"
      element={
        <Protector roles={[Roles.OWNER]}>
          <Suspense fallback={<Loading.Spinner />}>
            <SiteBuilder />
          </Suspense>
        </Protector>
      }
    />
  </Route>
)
