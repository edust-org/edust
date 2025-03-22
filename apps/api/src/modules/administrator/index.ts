import type { Router } from "express"
import express from "express"

import feedbackRoutes from "./feedback"
import helpCenterRoutes from "./help-center"
import instituteRoutes from "./institutes"
import organizationsRoutes from "./organizations"
import usersRoutes from "./users"

class Routes {
  private router: Router

  constructor() {
    this.router = express.Router()
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.use("/feedback", feedbackRoutes)
    this.router.use("/help-center", helpCenterRoutes)
    this.router.use("/institutes", instituteRoutes)
    this.router.use("/organizations", organizationsRoutes)
    this.router.use("/users", usersRoutes)
  }

  public getRouter(): Router {
    return this.router
  }
}

export default new Routes().getRouter()
