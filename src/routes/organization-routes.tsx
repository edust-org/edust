import { SitesBuilder } from "@/organizations/features/sites-builder";
import {
  CreateOrganization,
  CustomizeSite,
  Dashboard,
} from "@/organizations/features";
import { Route } from "react-router-dom";
import { Suspense } from "react";
import Loading from "@/components/loading";

const organizationRoutes = (
  <Route>
    <Route path="sites-builder" element={<SitesBuilder />}>
      <Route
        path=":pageId"
        element={
          <Suspense fallback={<Loading.Spinner />}>
            <CustomizeSite />
          </Suspense>
        }
      />
    </Route>
    <Route
      path="organizations"
      element={
        <Suspense fallback={<Loading.Spinner />}>
          <Dashboard />
        </Suspense>
      }
    >
      <Route path="" element={<h1>Dashboard Home</h1>} />
    </Route>
    <Route
      path="organizations/create"
      element={
        <Suspense fallback={<Loading.Spinner />}>
          <CreateOrganization />
        </Suspense>
      }
    />
  </Route>
);

export default organizationRoutes;
