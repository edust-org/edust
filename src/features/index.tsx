import { lazy } from "react";

export const Sites = lazy(() =>
  import("./sites").then((module) => ({ default: module.Sites }))
);
