import { jsonLoad } from "@/services"
import express from "express"
import type { Request, Response, Router } from "express"
import path from "path"

const router: Router = express.Router()

router.get("/", async (req: Request, res: Response) => {
  const data = await jsonLoad.load(
    path.resolve(__dirname, "./list-of-org.json"),
  )
  res.json(data)
})

router.get("/:orgId", async (req: Request, res: Response) => {
  const data = await jsonLoad.load(path.resolve(__dirname, "./get-by-id.json"))
  res.json(data)
})

router.patch("/:orgId", async (req: Request, res: Response) => {
  const data = await jsonLoad.load(path.resolve(__dirname, "./get-by-id.json"))
  res.json(data)
})

export default router
