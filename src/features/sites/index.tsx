import { lazy } from "react";

const Sites = lazy(() =>
  import("./sites").then((module) => ({ default: module.Sites }))
);

export { Sites };
