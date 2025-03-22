import { jsonLoad } from "@/services"
import express from "express"
import type { Request, Response, Router } from "express"
import path from "path"

const router: Router = express.Router()

router.get("/", async (req: Request, res: Response) => {
  const data = await jsonLoad.load(
    path.resolve(__dirname, "./get-feedback.json"),
  )
  res.json(data)
})

router
  .get("/:feedbackId", async (req: Request, res: Response) => {
    const data = await jsonLoad.load(
      path.resolve(__dirname, "./get-feedback-details.json"),
    )
    res.json(data)
  })
  .patch("/:feedbackId", async (req: Request, res: Response) => {
    const data = await jsonLoad.load(
      path.resolve(__dirname, "./get-feedback-details.json"),
    )
    res.json(data)
  })
  .delete("/:feedbackId", async (req: Request, res: Response) => {
    res.json({
      status: "SUCCESS",
      message: "Success! Your request has been completed.",
      data: null,
      _links: {
        self: {
          url: "/api/v0/administrator/feedback/{feedbackId}",
          method: "DELETE",
        },
        getById: {
          url: "/api/v0/administrator/feedback/{feedbackId}",
          method: "GET",
        },
        editById: {
          url: "/api/v0/administrator/feedback/{feedbackId}",
          method: "PATCH",
        },
        deleteById: {
          url: "/api/v0/administrator/feedback/{feedbackId}",
          method: "DELETE",
        },
      },
    })
  })

export default router
