import { http, HttpResponse } from "msw";
import { apiUrlV0 } from "../../api-url";
import { localStore } from "@/utils";
import organizationDb from "./organization-db";

const getListOfOrg = http.get(`${apiUrlV0}/organizations`, () => {
  const authToken = localStore.accessToken.get();

  if (!authToken) {
    return new HttpResponse(
      JSON.stringify({
        status: "error",
        message: "Unauthorized access",
      }),
      { status: 403 },
    );
  }
  return HttpResponse.json(organizationDb.orgLists);
});

const getSite = http.get(`${apiUrlV0}/organizations/site`, () => {
  const authToken = localStore.accessToken.get();

  if (!authToken || authToken !== "organizer") {
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
