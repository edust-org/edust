import express from "express"
import type { NextFunction, Request, Response, Router } from "express"
import { loadJsonFile } from "load-json-file"
import path from "path"

const router: Router = express.Router({ mergeParams: true })

router
  .post("/images", (req: Request, res: Response) => {
    res.json()
  })
  .get("/images", (req: Request, res: Response) => {
    res.json({
      status: "SUCCESS",
      message: "Success! Your request has been completed.",
      data: {
        items: [
          {
            id: "8cccf706-88c5-4857-adad-ad5c4e3cb73b",
            src: "https://cdn.prod.website-files.com/5e0f1144930a8bc8aace526c/65dd33d49a346d9be0b075ea_65dd12fa299e167d189f00f7-fed9c2116dfcf56370cea3063f4e88fa.jpeg",
            createdAt: "2023-08-08T01:40:51.854Z",
            updatedAt: "2025-02-26T22:55:12.075Z",
          },
          {
            id: "5678315c-4666-4987-ac8c-6027738d1bac",
            src: "https://images.unsplash.com/photo-1721297014430-a4a688954e10?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            createdAt: "2009-01-09T04:02:37.994Z",
            updatedAt: "2025-02-27T07:42:55.988Z",
          },
        ],
      },
      _links: {
        self: {
          href: "/api/v0/organizations/:orgId/site-builder/images",
          method: "GET",
        },
        deleteImage: {
          href: "/api/v0/organizations/:orgId/site-builder/images/:imageId",
          method: "DELETE",
        },
        uploadImage: {
          href: "/api/v0/organizations/:orgId/site-builder/images",
          method: "POST",
        },
        editImage: {
          href: "/api/v0/organizations/:orgId/site-builder/images/:imageId",
          method: "PATCH",
        },
      },
    })
  })
  .patch(
    "/images/:imageId",

    (req: Request, res: Response) => {
      res.json()
    },
  )
  .delete("/images/:imageId", (req: Request, res: Response) => {
    res.json()
  })

router
  .post("/pages", (req: Request, res: Response) => {
    res.json()
  })
  .patch("/pages/:pageId", (req: Request, res: Response) => {
    res.json()
  })
  .delete(
    "/pages/:pageId",

    (req: Request, res: Response) => {
      res.json()
    },
  )

router
  .post("/", (req: Request, res: Response) => {
    res.json()
  })
  .get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const siteBuilder = await loadJsonFile(
        path.resolve(__dirname, "./get-site-builder.json"),
      )
      res.json(siteBuilder)
    } catch (error) {
      next(error)
    }
  })
  .patch("/", (req: Request, res: Response) => {
    res.json()
  })

export default router
