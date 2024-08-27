import { lazy } from "react";

export const CreateOrganization = lazy(() =>
  import("./create").then((module) => ({ default: module.CreateOrganization }))
);

export const DashboardLayout = lazy(() =>
  import("./dashboard").then((module) => ({
    default: module.Dashboard,
  }))
);
export const Site = lazy(() =>
  import("./site").then((module) => ({
    default: module.Site,
  }))
);
export const SiteEdit = lazy(() =>
  import("./site-edit").then((module) => ({
    default: module.SiteEdit,
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
  Site,
  SiteEdit,
  SitesPages,
  SitesPageCustomize,
};
export default Dashboard;
