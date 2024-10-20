import { lazy } from "react";

const DashboardLayout = lazy(() =>
  import("./layout").then((module) => ({
    default: module.Layout,
  })),
);
const DashboardMain = lazy(() =>
  import("./dashboard-main").then((module) => ({
    default: module.DashboardMain,
  })),
);
const InstitutesCreate = lazy(() =>
  import("./institutes-create").then((module) => ({
    default: module.InstitutesCreate,
  })),
);
const InstitutesLists = lazy(() =>
  import("./institutes-lists").then((module) => ({
    default: module.InstitutesLists,
  })),
);

const Dashboard = {
  DashboardLayout,
  DashboardMain,
  InstitutesCreate,
  InstitutesLists,
};

export default Dashboard;
