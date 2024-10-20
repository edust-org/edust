import { lazy } from "react";

const Spinner = lazy(() =>
  import("./spinner").then((module) => ({ default: module.Spinner }))
);

const Loading = { Spinner };

export default Loading;
