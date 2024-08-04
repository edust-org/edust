import { lazy } from "react";

export const SitesBuilder = lazy(() =>
  import("./sites-builder").then((module) => ({ default: module.SitesBuilder }))
);
