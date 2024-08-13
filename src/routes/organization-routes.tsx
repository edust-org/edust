import Dashboard, { CreateOrganization } from "@/organizations/features";
import { Route } from "react-router-dom";
import { Suspense } from "react";
import Loading from "@/components/loading";
import IsOrganizationOwner from "./is-organization-owner";
import IsAuthenticated from "./is-authenticated";

const organizationRoutes = (
  <Route>
    <Route
      path="organizations"
      element={
        <IsOrganizationOwner>
          <Suspense fallback={<Loading.Spinner />}>
            <Dashboard.DashboardLayout />
          </Suspense>
        </IsOrganizationOwner>
      }
    >
      <Route path="" element={<h1>Dashboard Home</h1>} />
      <Route
        path="sites"
        element={
          <Suspense fallback={<Loading.Spinner />}>
            <Dashboard.Sites />
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
        <Suspense fallback={<Loading.Spinner />}>
          <Dashboard.SitesPageCustomize />
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
