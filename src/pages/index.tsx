import { lazy } from "react";

export const Home = lazy(() =>
  import("./home").then((module) => ({ default: module.Home }))
);

export const NotFound = lazy(() =>
  import("./not-found").then((module) => ({ default: module.NotFound }))
);

export const Playground = lazy(() =>
  import("./playground").then((module) => ({ default: module.Playground }))
);
