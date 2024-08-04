import { lazy } from "react";

export const SitesBuilder = lazy(() =>
  import("./sites-builder").then((module) => ({ default: module.SitesBuilder }))
);

export const CreateOrganization = lazy(() =>
  import("./create").then((module) => ({ default: module.CreateOrganization }))
);

export const CustomizeSite = lazy(() =>
  import("./sites-builder/customize-site").then((module) => ({
    default: module.CustomizeSite,
  }))
);
