import { jsonLoad } from "@/services"
import * as express from "express"
import type { Router } from "express"
import createHttpError from "http-errors"
import { statusCodes, statusMessages } from "http-status-kit"
import path from "path"

// Initialize the express router
const router: Router = express.Router()

router.post("/login", async (req, res) => {
  const { email, password } = req.body

  if (!email || !password || password !== "password2024") {
    throw createHttpError(statusCodes.NOT_FOUND, statusMessages.NOT_FOUND)
  }

  switch (email) {
    case "user@example.com":
      const user = await jsonLoad.load(
        path.resolve(__dirname, "./user-login.json"),
      )
      res.json(user)
      break

    case "organizer@example.com":
      const organizer = await jsonLoad.load(
        path.resolve(__dirname, "./organizer-login.json"),
      )
      res.json(organizer)
      break
    case "administrator@example.com":
      const administrator = await jsonLoad.load(
        path.resolve(__dirname, "./administrator-login.json"),
      )
      res.json(administrator)
      break
    default:
      const userDefault = await jsonLoad.load(
        path.resolve(__dirname, "./user-login.json"),
      )
      res.json(userDefault)
      break
  }
})

export default router
