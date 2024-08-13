import { lazy } from "react";

export const CreateOrganization = lazy(() =>
  import("./create").then((module) => ({ default: module.CreateOrganization }))
);

export const DashboardLayout = lazy(() =>
  import("./dashboard").then((module) => ({
    default: module.Dashboard,
  }))
);
export const Sites = lazy(() =>
  import("./sites").then((module) => ({
    default: module.Sites,
  }))
);

export const SitesPages = lazy(() =>
  import("./sites-pages").then((module) => ({
    default: module.SitesPages,
  }))
);
export const SitesPageCustomize = lazy(() =>
  import("./sites-page-customize").then((module) => ({
    default: module.SitesPageCustomize,
  }))
);

const Dashboard = {
  DashboardLayout,
  Sites,
  SitesPages,
  SitesPageCustomize,
};
export default Dashboard;
