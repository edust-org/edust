import { http, HttpResponse } from "msw"
import { apiUrlV0 } from "../../api-url"
import organizationDb from "./organization-db"
import token from "@/mocks/token"

const getListOfOrg = http.get(`${apiUrlV0}/organizations`, ({ request }) => {
  token.isAuthenticated(request)
  return HttpResponse.json(organizationDb.orgLists)
})

const getSiteBuilderMe = http.get(
  `${apiUrlV0}/organizations/site-builder/me`,
  ({ request }) => {
    token.isAuthenticated(request)
    token.isOrganizer(request)

    return HttpResponse.json(organizationDb.siteData)
  },
)

export const organizations = [getListOfOrg, getSiteBuilderMe]
