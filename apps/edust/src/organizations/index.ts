import { lazy } from "react";

export const AppShell = lazy(() =>
  import("./app-shell").then((module) => ({
    default: module.AppShell,
  })),
);
