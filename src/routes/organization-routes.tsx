import Dashboard, { CreateOrganization } from "@/organizations/features";
import { Route } from "react-router-dom";
import { Suspense } from "react";
import Loading from "@/components/loading";
import IsOrganizationOwner from "./is-organization-owner";
import IsAuthenticated from "./is-authenticated";
import { Role } from "@/types";

const organizationRoutes = (
  <Route>
    <Route
      path="organizations"
      element={
        <IsAuthenticated role={Role.OWNER}>
          <Suspense fallback={<Loading.Spinner />}>
            <Dashboard.DashboardLayout />
          </Suspense>
        </IsAuthenticated>
      }
    >
      <Route path="" element={<h1>Dashboard Home</h1>} />
      <Route
        path="site"
        element={
          <Suspense fallback={<Loading.Spinner />}>
            <Dashboard.Site />
          </Suspense>
        }
      />
      <Route
        path="pages"
        element={
          <Suspense fallback={<Loading.Spinner />}>
            <Dashboard.SitesPages />
          </Suspense>
        }
      />
    </Route>
    <Route
      path="/organizations/pages/:pageId"
      element={
        <IsAuthenticated role={Role.OWNER}>
          <Suspense fallback={<Loading.Spinner />}>
            <Dashboard.SitesPageCustomize />
          </Suspense>
        </IsAuthenticated>
      }
    />

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
