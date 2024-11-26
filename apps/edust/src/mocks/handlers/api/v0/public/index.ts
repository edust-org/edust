import { http, HttpResponse } from "msw"
import { apiUrlV0 } from "../../api-url"
import { getInstituteByIdDB, getOrgSitesPagesDB } from "./public-db"
import getInstitutesDB from "./get-institutes-db.json"
import getInstitutesCategoriesDB from "./get-institutes-categories-db.json"

const getOrgSitesByOrgId = http.get(
  `${apiUrlV0}/public/organizations/orgId-:145d86ab-7061-426b-acd0-2200ef634eb9/site/?name=home`,
  () => {
    return HttpResponse.json(getOrgSitesPagesDB)
  },
)
const getOrgSitesByUsername = http.get(
  `${apiUrlV0}/public/organizations/orgUsername-oxford-univ/site/?name=home`,
  () => {
    return HttpResponse.json(getOrgSitesPagesDB)
  },
)

const getInstitutes = http.get(`${apiUrlV0}/public/institutes`, () => {
  return HttpResponse.json(getInstitutesDB)
})

const getInstitutesCategories = http.get(
  `${apiUrlV0}/public/institutes/categories`,
  () => {
    return HttpResponse.json(getInstitutesCategoriesDB)
  },
)

const getInstituteById = http.get(`${apiUrlV0}/public/institutes/:id`, () => {
  return HttpResponse.json(getInstituteByIdDB)
})

export const publicApi = [
  getOrgSitesByOrgId,
  getOrgSitesByUsername,
  getInstitutes,
  getInstitutesCategories,
  getInstituteById,
]
