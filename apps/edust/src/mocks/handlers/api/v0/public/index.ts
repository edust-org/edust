import { http, HttpResponse } from "msw";
import { apiUrlV0 } from "../../api-url";
import { getInstituteByIdDB, getOrgSitesPagesDB } from "./public-db";
import getInstitutesDB from "./get-institutes-db.json";
import getInstitutesCategoriesDB from "./get-institutes-categories-db.json";

const getOrgSitesPages = http.get(
  `${apiUrlV0}/public/organizations/:orgIdOrUsername/site/?name=home`,
  () => {
    return HttpResponse.json(getOrgSitesPagesDB);
  },
);

const getInstitutes = http.get(`${apiUrlV0}/public/institutes`, () => {
  return HttpResponse.json(getInstitutesDB);
});

const getInstitutesCategories = http.get(
  `${apiUrlV0}/public/institutes/categories`,
  () => {
    return HttpResponse.json(getInstitutesCategoriesDB);
  },
);

const getInstituteById = http.get(`${apiUrlV0}/public/institutes/:id`, () => {
  return HttpResponse.json(getInstituteByIdDB);
});

export const publicApi = [
  getOrgSitesPages,
  getInstitutes,
  getInstitutesCategories,
  getInstituteById,
];
