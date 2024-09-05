import { http, HttpResponse } from "msw";
import { apiUrlV0 } from "../../api-url";

const getListOfOrg = http.get(`${apiUrlV0}/organizations`, ({ cookies }) => {
  const authToken = cookies.authToken;

  if (!authToken) {
    return new HttpResponse(
      JSON.stringify({
        status: "error",
        message: "Unauthorized access",
      }),
      { status: 403 },
    );
  }

  return HttpResponse.json({
    status: "success",
    message: "Get All Organizations Lists!",
    data: {
      items: [
        {
          id: "1eda04d7-71f7-4acc-ab15-3744688ecdc4",
          org_username: "maximize-cross-platform-e-business",
          name: "maximize cross-platform e-business",
          is_profile_verified: false,
          createdAt: "2024-09-05T16:37:34.000Z",
          updatedAt: "2024-09-05T16:37:34.000Z",
        },
        {
          id: "38e2216c-2f82-43e2-a7f6-072ad0ad516a",
          org_username: "enhance-turn-key-interfaces",
          name: "enhance turn-key interfaces",
          is_profile_verified: false,
          createdAt: "2024-09-05T16:37:34.000Z",
          updatedAt: "2024-09-05T16:37:34.000Z",
        },
      ],
    },
  });
});

export const organizations = [getListOfOrg];
