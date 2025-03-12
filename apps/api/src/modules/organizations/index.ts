import { authenticateForOrg } from "@/middleware"
import { jsonLoad } from "@/services"
import * as express from "express"
import type { Router } from "express"
import path from "path"

import siteBuilderRoutes from "./site-builder"

// Initialize the express router
const router: Router = express.Router()

router.get("/me", authenticateForOrg, async (req, res) => {
  const organizationMe = await jsonLoad.load(
    path.resolve(__dirname, "./get-org-me.json"),
  )
  res.json(organizationMe)
})

router
  .post("/", async (req, res) => {
    const organizations = await jsonLoad.load(
      path.resolve(__dirname, "./create-org.json"),
    )
    res.json(organizations)
  })
  .get("/", async (req, res) => {
    const organizations = await jsonLoad.load(
      path.resolve(__dirname, "./get-organization.json"),
    )
    res.json(organizations)
  })

router.use("/:orgId/site-builder", authenticateForOrg, siteBuilderRoutes)

export default router
