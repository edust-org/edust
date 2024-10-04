import { lazy } from "react";

export const CreateOrganization = lazy(() =>
  import("./create").then((module) => ({ default: module.CreateOrganization })),
);

export const Dashboard = lazy(() =>
  import("./dashboard").then((module) => ({
    default: module.Dashboard,
  })),
);
