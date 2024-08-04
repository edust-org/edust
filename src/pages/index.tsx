import { lazy } from "react";

const Home = lazy(() =>
  import("./home").then((module) => ({ default: module.Home }))
);

const ErrorPage = lazy(() =>
  import("./error-page").then((module) => ({ default: module.ErrorPage }))
);

const Playground = lazy(() =>
  import("./playground").then((module) => ({ default: module.Playground }))
);

export { Home, ErrorPage, Playground };
