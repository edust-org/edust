import { jsonLoad } from "@/services"
import express from "express"
import type { Request, Response, Router } from "express"
import path from "path"

const router: Router = express.Router()

router
  .get("/", async (req: Request, res: Response) => {
    const data = await jsonLoad.load(
      path.resolve(__dirname, "./user-list.json"),
    )
    res.json(data)
  })
  .get("/:userId", async (req: Request, res: Response) => {
    const data = await jsonLoad.load(path.resolve(__dirname, "./user.json"))
    res.json(data)
  })
  .patch("/:userId", async (req: Request, res: Response) => {
    const data = await jsonLoad.load(path.resolve(__dirname, "./user.json"))
    res.json(data)
  })

export default router
