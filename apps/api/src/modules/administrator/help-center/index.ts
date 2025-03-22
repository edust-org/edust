import { jsonLoad } from "@/services"
import express from "express"
import type { Request, Response, Router } from "express"
import path from "path"

const router: Router = express.Router()

router.get("/", async (req: Request, res: Response) => {
  const data = await jsonLoad.load(
    path.resolve(__dirname, "./get-help-center.json"),
  )
  res.json(data)
})

router
  .get("/:articleId", async (req: Request, res: Response) => {
    const data = await jsonLoad.load(
      path.resolve(__dirname, "./get-help-center-details.json"),
    )
    res.json(data)
  })
  .patch("/:articleId", async (req: Request, res: Response) => {
    const data = await jsonLoad.load(
      path.resolve(__dirname, "./get-help-center-details.json"),
    )
    res.json(data)
  })
  .delete("/:articleId", async (req: Request, res: Response) => {
    res.json({
      status: "SUCCESS",
      message: "Success! Your request has been completed.",
      data: null,
      _links: {
        self: {
          url: "/api/v0/administrator/help-center/{articleId}",
          method: "DELETE",
        },
        get: { url: "/api/v0/administrator/help-center", method: "GET" },
        getById: {
          url: "/api/v0/administrator/help-center/{articleId}",
          method: "GET",
        },
        editById: {
          url: "/api/v0/administrator/help-center/{articleId}",
          method: "PATCH",
        },
      },
    })
  })

export default router
