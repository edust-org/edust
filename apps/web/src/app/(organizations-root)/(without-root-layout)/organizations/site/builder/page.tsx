"use client"

import { Typography } from "@/components/ui"

import { Suspense, lazy } from "react"

const SiteBuilder = lazy(() => import("./site-builder"))

export default function Builder() {
  return (
    <>
      <Suspense
        fallback={<Typography variant="h3">Loading GrapesJS...</Typography>}
      >
        <SiteBuilder />
      </Suspense>
    </>
  )
}
