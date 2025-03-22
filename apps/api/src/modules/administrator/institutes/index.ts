import { jsonLoad } from "@/services"
import express from "express"
import type { Request, Response, Router } from "express"
import path from "path"

const router: Router = express.Router()

router.get("/", async (req: Request, res: Response) => {
  const data = await jsonLoad.load(
    path.resolve(__dirname, "../../../data/get-institutes.json"),
  )
  res.json(data)
})

router
  .get("/:instituteId", async (req: Request, res: Response) => {
    const data = await jsonLoad.load(
      path.resolve(__dirname, "./get-institute-details.json"),
    )
    res.json(data)
  })
  .patch("/:instituteId", async (req: Request, res: Response) => {
    const data = await jsonLoad.load(
      path.resolve(__dirname, "./get-institute-details.json"),
    )
    res.json(data)
  })
  .delete("/:instituteId", async (req: Request, res: Response) => {
    res.json({
      status: "SUCCESS",
      message: "Success! Your request has been completed.",
      data: null,
      _links: {
        self: {
          url: "/api/v0/administrator/institutes/{instituteId}",
          method: "DELETE",
        },
        getById: {
          url: "/api/v0/administrator/institutes/{instituteId}",
          method: "GET",
        },
        editById: {
          url: "/api/v0/administrator/institutes/{instituteId}",
          method: "PATCH",
        },
        deleteById: {
          url: "/api/v0/administrator/institutes/{instituteId}",
          method: "DELETE",
        },
      },
    })
  })

export default router
