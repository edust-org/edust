import Dashboard, { CreateOrganization } from "@/organizations/features";
import { Route } from "react-router-dom";
import { Suspense } from "react";
import Loading from "@/components/loading";
import IsAuthenticated from "./is-authenticated";
import { Role } from "@/types";
import { AppShell } from "@/organizations";

const organizationRoutes = (
  <Route>
    <Route
      path="organizations"
      element={
        <IsAuthenticated role={Role.OWNER}>
          <Suspense fallback={<Loading.Spinner />}>
            <AppShell />
          </Suspense>
        </IsAuthenticated>
      }
    >
      <Route
        path=""
        element={
          <h1 className="text-3xl font-bold">
            Dashboard Home For Organizations
          </h1>
        }
      />
      <Route
        path="site"
        element={
          <Suspense fallback={<Loading.Spinner />}>
            <Dashboard.Site />
          </Suspense>
        }
      />
    </Route>
    <Route
      path="/organizations/site/edit"
      element={
        <Suspense fallback={<Loading.Spinner />}>
          <Dashboard.SiteEdit />
        </Suspense>
      }
    />

    <Route
      path="/organizations/create"
      element={
        <IsAuthenticated>
          <Suspense fallback={<Loading.Spinner />}>
            <CreateOrganization />
          </Suspense>
        </IsAuthenticated>
      }
    />
  </Route>
);

export default organizationRoutes;
