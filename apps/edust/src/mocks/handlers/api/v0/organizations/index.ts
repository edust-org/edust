import { delay, http, HttpResponse } from "msw"
import { apiUrlV0 } from "../../api-url"
import createOrgDB from "./create-org.json"
import listOfOrgDB from "./list-of-org.json"
import siteBuilderDB from "./site-builder.json"
import token from "@/mocks/token"
import { sendOrgResponse } from "./send-org-response"
import getOrgMeDB from "./get-org-me.json"

const getOrgMe = http.get(
  `${apiUrlV0}/organizations/me`,
  async ({ request }) => {
    await delay(300)
    return sendOrgResponse(request, getOrgMeDB)
  },
)

const getListOfOrg = http.get(
  `${apiUrlV0}/organizations`,
  async ({ request }) => {
    token.isAuthenticated(request)
    await delay(300)
    return HttpResponse.json(listOfOrgDB)
  },
)

const createOrg = http.post(
  `${apiUrlV0}/organizations`,
  async ({ request }) => {
    const actualBody = await request.clone().json()
    const { name, orgUsername } = actualBody
    token.isAuthenticated(request)

    const response = createOrgDB

    response.data.name = name
    response.data.orgUsername = orgUsername

    return HttpResponse.json(response)
  },
)

const createSiteBuilder = http.post(
    `${apiUrlV0}/organizations/:orgId/site-builder`,
    ({ request }) =>
      sendOrgResponse(request, {
        status: "success",
        message: "Success! New resource created.",
        data: null,
        _links: {
          self: {
            href: "/api/v0/organizations/:orgId/site-builder",
            method: "POST",
          },
          create: {
            href: "/api/v0/organizations/:orgId/site-builder",
            method: "POST",
          },
          uploadImage: {
            href: "/api/v0/organizations/:orgId/site-builder/images",
            method: "POST",
          },
        },
      }),
  ),
  getSiteBuilder = http.get(
    `${apiUrlV0}/organizations/:orgId/site-builder`,
    ({ request }) => sendOrgResponse(request, siteBuilderDB),
  ),
  editSiteBuilder = http.patch(
    `${apiUrlV0}/organizations/:orgId/site-builder`,
    async ({ request }) => {
      return sendOrgResponse(request, {
        status: "success",
        message: "Site updated successfully!",
        data: null,
        _links: {
          self: {
            href: "/api/v0/organizations/:orgId/site-builder",
            method: "PATCH",
          },
          create: {
            href: "/api/v0/organizations/:orgId/site-builder",
            method: "POST",
          },
          uploadImage: {
            href: "/api/v0/organizations/:orgId/site-builder/images",
            method: "POST",
          },
        },
      })
    },
  )

export const organizations = [
  getOrgMe,
  createOrg,
  getListOfOrg,
  createSiteBuilder,
  getSiteBuilder,
  editSiteBuilder,
]
