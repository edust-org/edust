import { http, HttpResponse } from "msw";
import { apiUrlV0 } from "../../api-url";
import organizationDb from "./organization-db";
import { hasToken } from "@/mocks/has-token";

const getListOfOrg = http.get(`${apiUrlV0}/organizations`, ({ cookies }) => {
  hasToken(cookies.access_token);
  return HttpResponse.json(organizationDb.orgLists);
});

const getSite = http.get(`${apiUrlV0}/organizations/site`, ({ cookies }) => {
  hasToken(cookies.access_token);

  if (cookies.access_token !== "organizer") {
    return new HttpResponse(
      JSON.stringify({
        status: "error",
        message: "Unauthorized access",
      }),
      { status: 403 },
    );
  }

  return HttpResponse.json(organizationDb.siteData);
});

export const organizations = [getListOfOrg, getSite];
