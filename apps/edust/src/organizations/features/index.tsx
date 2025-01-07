import { lazy } from "react"

export * from "./create"
export * from "./dashboard"
export * from "./access-control"
export * from "./site-builder"

export const Site = lazy(() =>
  import("./site").then((module) => ({
    default: module.Site,
  })),
)
