import {
  CreateOrganization,
  Dashboard,
  Site,
  SiteEdit,
} from "@/organizations/features";
import { Route } from "react-router-dom";
import { Suspense } from "react";
import Loading from "@/components/loading";
import { Roles } from "@/types";
import { AppShell } from "@/organizations";
import { Protector } from "./protector";

export const organizationRoutes = (
  <Route>
    <Route
      path="/"
      element={
        <Protector roles={[Roles.OWNER, Roles.EDITOR]}>
          <Suspense fallback={<Loading.Spinner />}>
            <AppShell />
          </Suspense>
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
      <Route
        path="settings"
        element={
          <Protector roles={[Roles.OWNER, Roles.EDITOR]}>
            <Suspense fallback={<Loading.Spinner />}>
              <h1>Setting</h1>
            </Suspense>
          </Protector>
        }
      />
    </Route>
    <Route
      path="/site/edit"
      element={
        <Protector roles={[Roles.OWNER]}>
          <Suspense fallback={<Loading.Spinner />}>
            <SiteEdit />
          </Suspense>
        </Protector>
      }
    />

    <Route
      path="/create"
      element={
        <Protector roles={[Roles.OWNER]}>
          <Suspense fallback={<Loading.Spinner />}>
            <CreateOrganization />
          </Suspense>
        </Protector>
      }
    />
  </Route>
);
