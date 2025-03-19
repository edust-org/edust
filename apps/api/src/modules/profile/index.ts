import { jsonLoad } from "@/services"
import express from "express"
import type { Router } from "express"
import path from "path"

const router: Router = express.Router()

router
  .get("/me", async (req, res) => {
    const data = await jsonLoad.load(
      path.resolve(__dirname, "./get-edit-profile-me.json"),
    )
    res.json(data)
  })
  .patch("/me", async (req, res) => {
    const data = await jsonLoad.load(
      path.resolve(__dirname, "./get-edit-profile-me.json"),
    )
    res.json(data)
  })

router
  .get("/", async (req, res) => {
    const data = await jsonLoad.load(
      path.resolve(__dirname, "../../data/user-list.json"),
    )
    data.data.items = data.data.items.map((item: any) => ({
      id: item.id,
      name: item.name,
      username: item.username,
      profilePic: item.profilePic,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    }))
    res.json(data)
  })
  .get("/userId-:userId", async (req, res) => {
    const data = await jsonLoad.load(
      path.resolve(__dirname, "./get-profile-by-id-or-username.json"),
    )
    res.json(data)
  })
  .get("/username-:username", async (req, res) => {
    const data = await jsonLoad.load(
      path.resolve(__dirname, "./get-profile-by-id-or-username.json"),
    )
    res.json(data)
  })

export default router
