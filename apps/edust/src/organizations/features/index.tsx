import { lazy } from "react"

export const CreateOrganization = lazy(() =>
  import("./create").then((module) => ({ default: module.CreateOrganization })),
)

export const Dashboard = lazy(() =>
  import("./dashboard").then((module) => ({
    default: module.Dashboard,
  })),
)

export const Site = lazy(() =>
  import("./site").then((module) => ({
    default: module.Site,
  })),
)

export const AccessControl = lazy(() =>
  import("./access-control").then((module) => ({
    default: module.AccessControl,
  })),
)

export const SiteBuilder = lazy(() =>
  import("./site-builder").then((module) => ({
    default: module.SiteBuilder,
  })),
)
