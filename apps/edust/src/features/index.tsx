import { lazy } from "react"

export * from "./institutes"

export const Site = lazy(() =>
  import("./site").then((module) => ({ default: module.Site })),
)

export * from "./institutes/details"
