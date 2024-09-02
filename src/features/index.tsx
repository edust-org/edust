import { lazy } from "react";

export const Site = lazy(() =>
  import("./site").then((module) => ({ default: module.Site })),
);

export const Institutes = lazy(() =>
  import("./institutes").then((module) => ({ default: module.Institutes })),
);

export const InstituteDetails = lazy(() =>
  import("./institutes/details").then((module) => ({
    default: module.InstituteDetails,
  })),
);
