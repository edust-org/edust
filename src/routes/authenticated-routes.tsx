import Loading from "@/components/loading";
import { PrivateHome } from "@/pages/home";
import { Suspense } from "react";
import { Route } from "react-router-dom";
import Dashboard from "@/features/dashboard";
import IsAuthenticated from "./is-authenticated";
import { CreateOrganization } from "@/organizations/features";

export const authenticatedRoutes = (
  <Route>
    <Route
      path="/"
      element={
        <IsAuthenticated>
          <Suspense fallback={<Loading.Spinner />}>
            <PrivateHome />
          </Suspense>
        </IsAuthenticated>
      }
    />

    <Route
      path="/dashboard"
      element={
        <IsAuthenticated>
          <Suspense fallback={<Loading.Spinner />}>
            <Dashboard.DashboardLayout />
          </Suspense>
        </IsAuthenticated>
      }
    >
      <Route
        path=""
        element={
          <Suspense fallback={<Loading.Spinner />}>
            <Dashboard.DashboardMain />
          </Suspense>
        }
      ></Route>
      <Route
        path="institutes"
        element={
          <Suspense fallback={<Loading.Spinner />}>
            <h1>Institutes</h1>
          </Suspense>
        }
      ></Route>
      <Route
        path="institutes/create"
        element={
          <Suspense fallback={<Loading.Spinner />}>
            <Dashboard.InstitutesCreate />
          </Suspense>
        }
      />
      <Route
        path="institutes/lists"
        element={
          <Suspense fallback={<Loading.Spinner />}>
            <Dashboard.InstitutesLists />
          </Suspense>
        }
      />
    </Route>

    <Route
      path="create-a-new-organizations"
      element={
        <IsAuthenticated>
          <Suspense fallback={<Loading.Spinner />}>
            <CreateOrganization />
          </Suspense>
        </IsAuthenticated>
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
