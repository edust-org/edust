import { authenticateForOrg } from "@/middleware"
import * as express from "express"
import type { Router } from "express"
import { loadJsonFile } from "load-json-file"
import path from "path"

import siteBuilderRoutes from "./site-builder"

// Initialize the express router
const router: Router = express.Router()

router.get("/me", authenticateForOrg, async (req, res) => {
  const organizationMe = await loadJsonFile(
    path.resolve(__dirname, "./get-org-me.json"),
  )
  res.json(organizationMe)
})

router
  .post("/", async (req, res) => {
    const organizations = await loadJsonFile(
      path.resolve(__dirname, "./create-org.json"),
    )
    res.json(organizations)
  })
  .get("/", async (req, res) => {
    const organizations = await loadJsonFile(
      path.resolve(__dirname, "./get-organization.json"),
    )
    res.json(organizations)
  })

router.use("/:orgId/site-builder", authenticateForOrg, siteBuilderRoutes)

export default router
