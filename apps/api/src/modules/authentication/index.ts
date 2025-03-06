import * as express from "express"
import type { Router } from "express"
import createHttpError from "http-errors"
import { statusCodes, statusMessages } from "http-status-kit"
import { loadJsonFile } from "load-json-file"
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
      const user = await loadJsonFile(
        path.resolve(__dirname, "./user-login.json"),
      )
      res.json(user)
      break

    case "organizer@example.com":
      break
    default:
      const userDefault = await loadJsonFile(
        path.resolve(__dirname, "./organizer-login.json"),
      )
      res.json(userDefault)
      break
  }
})

export default router
