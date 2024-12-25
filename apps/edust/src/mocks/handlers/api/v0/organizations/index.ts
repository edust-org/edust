import { http, HttpResponse } from "msw"
import { apiUrlV0 } from "../../api-url"
import createOrgDB from "./create-org.json"
import listOfOrgDB from "./list-of-org.json"
import siteBuilderMe from "./site-builder-me.json"
import token from "@/mocks/token"

const getListOfOrg = http.get(`${apiUrlV0}/organizations`, ({ request }) => {
  token.isAuthenticated(request)
  return HttpResponse.json(listOfOrgDB)
})

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

const getSiteBuilderMe = http.get(
  `${apiUrlV0}/organizations/site-builder/me`,
  ({ request }) => {
    token.isAuthenticated(request)
    token.isOrganizer(request)

    return HttpResponse.json(siteBuilderMe)
  },
)

export const organizations = [createOrg, getListOfOrg, getSiteBuilderMe]
