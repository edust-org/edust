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

export const Pages = lazy(() =>
  import("./pages").then((module) => ({
    default: module.Pages,
  }))
);
export const PageCustomize = lazy(() =>
  import("./page-customize").then((module) => ({
    default: module.PageCustomize,
  }))
);

const Dashboard = {
  DashboardLayout,
  Sites,
  Pages,
  PageCustomize,
};
export default Dashboard;
