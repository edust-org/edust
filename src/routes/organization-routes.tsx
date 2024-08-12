import Dashboard, { CreateOrganization } from "@/organizations/features";
import { Route } from "react-router-dom";
import { Suspense } from "react";
import Loading from "@/components/loading";

const organizationRoutes = (
  <Route>
    <Route
      path="organizations"
      element={
        <Suspense fallback={<Loading.Spinner />}>
          <Dashboard.DashboardLayout />
        </Suspense>
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
            <Dashboard.Pages />
          </Suspense>
        }
      />
    </Route>
    <Route
      path="organizations/pages/:pageId"
      element={
        <Suspense fallback={<Loading.Spinner />}>
          <Dashboard.PageCustomize />
        </Suspense>
      }
    />
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
