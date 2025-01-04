import { lazy } from "react"

export * from "./create"
export * from "./dashboard"
export * from "./access-control"

export const Site = lazy(() =>
  import("./site").then((module) => ({
    default: module.Site,
  })),
)

export const SiteBuilder = lazy(() =>
  import("./site-builder").then((module) => ({
    default: module.SiteBuilder,
  })),
)
