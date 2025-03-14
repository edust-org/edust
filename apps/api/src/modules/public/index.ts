import { jsonLoad } from "@/services"
import express from "express"
import type { Router } from "express"
import createHttpError from "http-errors"
import { statusCodes, statusMessages } from "http-status-kit"
import path from "path"

const router: Router = express.Router()

router.post("/feedback", async (req, res) => {})

router
  .get("/help-center", async (req, res) => {})
  .get("/help-center/:articleId", async (req, res) => {})

router.get("/institutes/categories", async (req, res) => {
  const categories = await jsonLoad.load(
    path.resolve(__dirname, "../../data/institute-category.json"),
  )

  res.json({
    status: "SUCCESS",
    message: "Success! Your request has been completed.",
    data: { items: categories },
    _links: {
      self: {
        href: "/api/v0/public/institutes/categories",
        method: "GET",
      },
    },
  })
})

router.get("/institutes", async (req, res) => {
  const institutes = await jsonLoad.load(
    path.resolve(__dirname, "./get-institutes.json"),
  )
  res.json(institutes)
})

router.get("/institutes/:instituteId", (req, res) => {
  const instituteId = req.params.instituteId

  if (!instituteId) {
    throw createHttpError(statusCodes.NOT_FOUND, statusMessages.NOT_FOUND)
  }
  res.json({
    status: "SUCCESS",
    message: "Success! Your request has been completed.",
    data: {
      id: "007c67b4-1685-4062-8648-d7c927bb135c",
      instituteCategoryId: "dce65344-4209-4cb3-9061-a45c14fe827f",
      instituteCategory: "Public Law Colleges",
      name: "Roberts, Marquardt and Wintheiser",
      slug: "roberts-marquardt-and-wintheiser",
      code: "729106",
      codeType: "eiin",
      overview: "Summa sortitus urbanus timor depopulo qui synagoga.",
      photo: "https://loremflickr.com/1280/720/school?lock=5904712883601942",
      contactEmail: "irmacummings_abbott51@hotmail.com",
      phoneNumber: "1-614-622-6932 x18295",
      website: "https://sandy-halt.net/",
      foundedDate: "1997-09-03T12:48:22.499Z",
      principalName: "Irma Cummings",
      language: "English",
      country: "Bangladesh",
      division: "Kentucky",
      district: "Hawaii",
      subDivision: null,
      subDistrict: "Fairfield",
      addressLine1: "3757 Garrick Flats",
      addressLine2: null,
      postalCode: "17721-7305",
      latitude: -61.2538,
      longitude: 139.1619,
      createdAt: "1983-10-14T05:05:20.144Z",
      updatedAt: "1983-10-14T05:05:20.144Z",
      author: {
        id: "b4bb02cc-7da5-4b2b-b842-48b0d1a5f886",
        name: "User",
        profilePic: "https://cdn-icons-png.flaticon.com/512/1754/1754623.png",
      },
    },
    _links: {
      self: { href: "/api/v0/public/institutes/:id", method: "GET" },
      getInstitutes: { href: "/api/v0/public/institutes", method: "GET" },
    },
  })
})

router
  .get("/organizations/orgId-:orgId/site", async (req, res) => {
    const data = await jsonLoad.load(
      path.resolve(__dirname, "./get-site-by-ordId.json"),
    )
    res.json(data)
  })
  .get("/organizations/orgUsername-:orgUsername/site", async (req, res) => {
    const data = await jsonLoad.load(
      path.resolve(__dirname, "./get-site-by-org-username.json"),
    )
    res.json(data)
  })

router
  .get("/profile/userId-:userId", async (req, res) => {
    const data = await jsonLoad.load(
      path.resolve(__dirname, "./get-user-profile.json"),
    )
    res.json(data)
  })
  .get("/profile/username-:username", async (req, res) => {
    const data = await jsonLoad.load(
      path.resolve(__dirname, "./get-user-profile.json"),
    )
    res.json(data)
  })

export default router
