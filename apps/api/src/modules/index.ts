import { authenticate } from "@/middleware"
import * as express from "express"
import type { Router } from "express"

import authenticationRoutes from "./authentication"
import institutesRoutes from "./institutes"
import organizationsRoutes from "./organizations"
import publicRoutes from "./public"

// Initialize the express router
const router: Router = express.Router()

// Set up the routes
router.use("/v0/auth", authenticationRoutes)
router.use("/v0/public", publicRoutes)

router.use("/v0/institutes", authenticate(), institutesRoutes)
router.use("/v0/organizations", authenticate(), organizationsRoutes)

// Export the router
export default router
