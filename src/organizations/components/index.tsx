import { lazy } from "react";

export const HaveOrganization = lazy(() =>
  import("./have-organization").then((module) => ({
    default: module.HaveOrganization,
  }))
);

export const CreateOrganizationForm = lazy(() =>
  import("./create-organization-form").then((module) => ({
    default: module.CreateOrganizationForm,
  }))
);
