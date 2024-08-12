import { lazy } from "react";

export const CreateOrganization = lazy(() =>
  import("./create").then((module) => ({ default: module.CreateOrganization }))
);

export const CustomizeSite = lazy(() =>
  import("./sites-builder/customize-site").then((module) => ({
    default: module.CustomizeSite,
  }))
);

export const Dashboard = lazy(() =>
  import("./dashboard").then((module) => ({
    default: module.Dashboard,
  }))
);

export const SitesBuilder = lazy(() =>
  import("./sites-builder").then((module) => ({ default: module.SitesBuilder }))
);
