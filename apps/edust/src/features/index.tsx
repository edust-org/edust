import { lazy } from "react"

export * from "./institutes"

export const Site = lazy(() =>
  import("./site").then((module) => ({ default: module.Site })),
)

export const InstituteDetails = lazy(() =>
  import("./institutes/details").then((module) => ({
    default: module.InstituteDetails,
  })),
)
