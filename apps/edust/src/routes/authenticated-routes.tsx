import Loading from "@/components/loading";
import { PrivateHome } from "@/pages/home";
import { Suspense } from "react";
import { Route } from "react-router-dom";
import Dashboard from "@/features/dashboard";
import { CreateOrganization } from "@/organizations/features";
import { Protector } from "./protector";
import { Roles } from "@/types";

export const authenticatedRoutes = (
  <Route>
    <Route
      path="/"
      element={
        <Protector roles={[Roles.USER]}>
          <Suspense fallback={<Loading.Spinner />}>
            <PrivateHome />
          </Suspense>
        </Protector>
      }
    />

    <Route
      path="/dashboard"
      element={
        <Protector roles={[Roles.USER]}>
          <Suspense fallback={<Loading.Spinner />}>
            <Dashboard.DashboardLayout />
          </Suspense>
        </Protector>
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
        <Protector roles={[Roles.USER]}>
          <Suspense fallback={<Loading.Spinner />}>
            <CreateOrganization />
          </Suspense>
        </Protector>
      }
    />
    <Route
      path="/organizations/create"
      element={
        <Protector roles={[Roles.USER]}>
          <Suspense fallback={<Loading.Spinner />}>
            <CreateOrganization />
          </Suspense>
        </Protector>
      }
    />
  </Route>
);
