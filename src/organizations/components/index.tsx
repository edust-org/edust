import { lazy } from "react";

export const HaveAnOrgAccount = lazy(() =>
  import("./have-an-org-account").then((module) => ({
    default: module.HaveAnOrgAccount,
  }))
);
