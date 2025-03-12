import { jsonLoad } from "@/services"
import express from "express"
import type { Request, Response, Router } from "express"
import path from "path"

const router: Router = express.Router()

router.get("/me", async (req: Request, res: Response) => {
  const institutesMe = await jsonLoad.load(
    path.resolve(__dirname, "./get-institutes-me.json"),
  )
  res.json(institutesMe)
})

router
  .post("/", async (req: Request, res: Response) => {
    const institute = await jsonLoad.load(
      path.resolve(__dirname, "./store.json"),
    )
    res.json(institute)
  })
  .get("/:instituteId", async (req: Request, res: Response) => {
    const institute = await jsonLoad.load(
      path.resolve(__dirname, "./store.json"),
    )
    res.json(institute)
  })
  .patch("/:instituteId", async (req: Request, res: Response) => {
    const institute = await jsonLoad.load(
      path.resolve(__dirname, "./store.json"),
    )
    res.json(institute)
  })
  .delete("/:instituteId", (req: Request, res: Response) => {})

export default router
