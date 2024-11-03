import { http, HttpResponse } from "msw";
import { apiUrlV0 } from "../../api-url";
import {
  getInstituteByIdDB,
  getInstitutesDB,
  getOrgSitesPagesDB,
} from "./public-db";

const getOrgSitesPages = http.get(
  `${apiUrlV0}/public/organizations/:orgIdOrUsername/site/?name=home`,
  () => {
    return HttpResponse.json(getOrgSitesPagesDB);
  }
);

const getInstitutes = http.get(`${apiUrlV0}/public/institutes`, () => {
  return HttpResponse.json(getInstitutesDB);
});

const getInstituteById = http.get(`${apiUrlV0}/public/institutes/:id`, () => {
  return HttpResponse.json(getInstituteByIdDB);
});

export const publicApi = [getOrgSitesPages, getInstitutes, getInstituteById];
