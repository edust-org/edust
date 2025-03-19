import { authenticate } from "@/middleware"
import * as express from "express"
import type { Router } from "express"

import administratorRoutes from "./administrator"
import authenticationRoutes from "./authentication"
import institutesRoutes from "./institutes"
import organizationsRoutes from "./organizations"
import profileRoutes from "./profile"
import publicRoutes from "./public"

// Initialize the express router
const router: Router = express.Router()

// Set up the routes
router.use("/v0/auth", authenticationRoutes)
router.use("/v0/public", publicRoutes)

router.use("/v0/institutes", authenticate(), institutesRoutes)
router.use("/v0/profile", authenticate(), profileRoutes)
router.use("/v0/organizations", authenticate(), organizationsRoutes)
router.use("/v0/administrator", authenticate(), administratorRoutes)

// Export the router
export default router
