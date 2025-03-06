import * as express from "express"
import type { Router } from "express"
import { loadJsonFile } from "load-json-file"
import path from "path"

// Initialize the express router
const router: Router = express.Router()

router.get("/", async (req, res) => {
  const organizations = await loadJsonFile(
    path.resolve(__dirname, "./get-organization.json"),
  )
  res.json(organizations)
})

export default router
