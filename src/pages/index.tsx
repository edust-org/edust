import { lazy } from "react";

export const Home = lazy(() =>
  import("./home").then((module) => ({ default: module.Home }))
);

export const ErrorPage = lazy(() =>
  import("./error-page").then((module) => ({ default: module.ErrorPage }))
);

export const Playground = lazy(() =>
  import("./playground").then((module) => ({ default: module.Playground }))
);
