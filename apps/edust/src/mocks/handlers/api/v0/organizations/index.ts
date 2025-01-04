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
  ),
  createOrg = http.post(`${apiUrlV0}/organizations`, async ({ request }) => {
    const actualBody = await request.clone().json()
    const { name, orgUsername } = actualBody
    token.isAuthenticated(request)

    const response = createOrgDB

    response.data.name = name
    response.data.orgUsername = orgUsername

    return HttpResponse.json(response)
  })

const uploadSiteBuilderImage = http.post(
    `${apiUrlV0}/organizations/:orgId/site-builder/images`,
    async ({ request }) => {
      await delay(500)
      return sendOrgResponse(request, {
        status: "success",
        message: "Success! New resource created.",
        data: {
          id: "xxxxxxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
          src: "https://dummyimage.com/1280x720/000000/fff",
          createdAt: "2024-09-06T12:45:20Z",
          updatedAt: "2024-09-06T12:45:20Z",
        },
        _links: {
          self: {
            href: "/api/v0/organizations/:orgId/site-builder/images",
            method: "POST",
          },
          getImages: {
            href: "/api/v0/organizations/:orgId/site-builder/images",
            method: "GET",
          },
          deleteImage: {
            href: "/api/v0/organizations/:orgId/site-builder/images/:imageId",
            method: "DELETE",
          },
          editImage: {
            href: "/api/v0/organizations/:orgId/site-builder/images/:imageId",
            method: "PATCH",
          },
        },
      })
    },
  ),
  getSiteBuilderImages = http.get(
    `${apiUrlV0}/organizations/:orgId/site-builder/images`,
    ({ request }) =>
      sendOrgResponse(request, {
        status: "success",
        message: "Success! Your request has been completed.",
        data: {
          items: [
            {
              id: "xxxxxxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
              src: "https://dummyimage.com/1280x720/000000/fff",
              createdAt: "2024-09-06T01:35:20Z",
              updatedAt: "2024-09-06T01:35:20Z",
            },
            {
              id: "xxxxxxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
              src: "https://dummyimage.com/1280x720/000000/fff",
              createdAt: "2024-09-06T01:35:20Z",
              updatedAt: "2024-09-06T01:35:20Z",
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
      }),
  ),
  editSiteBuilderImagesById = http.patch(
    `${apiUrlV0}/organizations/:orgId/site-builder/images/:imageId`,
    async ({ request }) => {
      return sendOrgResponse(request, {
        status: "success",
        message: "Site retrieved successfully!",
        data: {
          id: "xxxxxxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
          assets: "{}",
          createdAt: "2024-09-06T01:35:20Z",
          updatedAt: "2024-09-06T01:35:20Z",
        },
        _links: {
          self: {
            href: "/api/v0/organizations/:orgId/site-builder/images/:imageId",
            method: "PATCH",
          },
          deleteImage: {
            href: "/api/v0/organizations/:orgId/site-builder/images/:imageId",
            method: "DELETE",
          },
          get: {
            href: "/api/v0/organizations/:orgId/site-builder/images",
            method: "GET",
          },
          uploadImage: {
            href: "/api/v0/organizations/:orgId/site-builder/images",
            method: "POST",
          },
        },
      })
    },
  ),
  deleteSiteBuilderImagesById = http.delete(
    `${apiUrlV0}/organizations/:orgId/site-builder/images/:imageId`,
    async ({ request }) => {
      return sendOrgResponse(request, {
        status: "success",
        message: "Success! No additional content available.",
        data: null,
        _links: {
          self: {
            href: "/api/v0/organizations/:orgId/site-builder/images/:imageId",
            method: "DELETE",
          },
          get: {
            href: "/api/v0/organizations/:orgId/site-builder/images",
            method: "GET",
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
    },
  )

const createSiteBuilder = http.post(
    `${apiUrlV0}/organizations/:orgId/site-builder`,
    async ({ request }) => {
      await delay(500)
      return sendOrgResponse(request, {
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
      })
    },
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
  uploadSiteBuilderImage,
  getSiteBuilderImages,
  editSiteBuilderImagesById,
  deleteSiteBuilderImagesById,
  createSiteBuilder,
  getSiteBuilder,
  editSiteBuilder,
]
