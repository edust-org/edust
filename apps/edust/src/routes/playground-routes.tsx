import { Route } from "react-router-dom";
import { Suspense } from "react";
import Loading from "@/components/loading";
import { Playground } from "@/pages";

import AppShell from "@/pages/playground/dashboard-v1/components/app-shell";

import V1Dashboard from "@/pages/playground/dashboard-v1/pages/dashboard";
import V1Task from "@/pages/playground/dashboard-v1/pages/tasks";
import { ComingSoon as V1CommingSoon } from "@/components/coming-soon";
import V1Settings from "@/pages/playground/dashboard-v1/pages/settings";
import V1SettingsProfile from "@/pages/playground/dashboard-v1/pages/settings/profile";
import V1SettingsAccount from "@/pages/playground/dashboard-v1/pages/settings/account";
import V1SettingsAppearance from "@/pages/playground/dashboard-v1/pages/settings/appearance";
import V1SettingsNotifications from "@/pages/playground/dashboard-v1/pages/settings/notifications";
import V1SettingsDisplay from "@/pages/playground/dashboard-v1/pages/settings/display";
import V1SettingsErrorEx from "@/pages/playground/dashboard-v1/pages/settings/error-example";

import V1GeneralError from "@/pages/playground/dashboard-v1/pages/errors/general-error";
import V1NotFoundError from "@/pages/playground/dashboard-v1/pages/errors/not-found-error";
import V1MaintenanceError from "@/pages/playground/dashboard-v1/pages/errors/maintenance-error";
import V1UnauthorisedError from "@/pages/playground/dashboard-v1/pages/errors/unauthorised-error";
export const playgroundRoutes = (
  <Route>
    <Route
      path="playground"
      element={
        <Suspense fallback={<Loading.Spinner />}>
          <Playground />
        </Suspense>
      }
    />

    <Route path="playground/dashboard" element={<AppShell />}>
      <Route index element={<V1Dashboard />} />
      <Route path="tasks" element={<V1Task />} />
      <Route path="users" element={<V1CommingSoon />} />
      <Route path="settings" element={<V1Settings />}>
        <Route index element={<V1SettingsProfile />} />
        <Route path="account" element={<V1SettingsAccount />} />
        <Route path="appearance" element={<V1SettingsAppearance />} />
        <Route path="notifications" element={<V1SettingsNotifications />} />
        <Route path="display" element={<V1SettingsDisplay />} />
        <Route path="error-example" element={<V1SettingsErrorEx />} />
      </Route>
    </Route>

    <Route path="/500" element={<V1GeneralError />} />
    <Route path="/404" element={<V1NotFoundError />} />
    <Route path="/503" element={<V1MaintenanceError />} />
    <Route path="/401" element={<V1UnauthorisedError />} />
  </Route>
);
