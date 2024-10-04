import { lazy } from "react";

export const HaveAnOrgAccount = lazy(() =>
  import("./have-an-org-account").then((module) => ({
    default: module.HaveAnOrgAccount,
  })),
);

export const TopNav = lazy(() =>
  import("./top-nav").then((module) => ({
    default: module.TopNav,
  })),
);
