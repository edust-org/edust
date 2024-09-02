import { lazy } from "react";

export const Site = lazy(() =>
  import("./site").then((module) => ({ default: module.Site })),
);
