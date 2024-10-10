import { http, HttpResponse } from "msw";
import { apiUrlV0 } from "../../api-url";
import { localStore } from "@/utils";

export const user = http.get(`${apiUrlV0}/user/self`, () => {
  const authToken = localStore.accessToken.get();

  if (!authToken) {
    return new HttpResponse(
      JSON.stringify({
        status: "error",
        message: "Unauthorized access",
      }),
      { status: 401 },
    );
  }

  if (authToken === "user") {
    return HttpResponse.json({
      status: "success",
      message: "User Information",
      data: {
        user: {
          id: "07909b67-92b4-4329-9586-d282941dfc2d",
          name: "User",
          username: null,
          email: "user@example.com",
          password: "password2024",
          account_type: "local",
          account_details: null,
          is_verified: true,
          is_profile_verified: false,
          createdAt: "2024-09-03T14:19:29.000Z",
          updatedAt: "2024-09-03T14:19:29.000Z",
        },
      },
    });
  }

  if (authToken === "organizer") {
    return HttpResponse.json({
      status: "success",
      message: "User Information",
      data: {
        user: {
          id: "9bc3b5c1-296a-4712-859e-f4283e8b0e2a",
          name: "Organizer",
          username: "organizer",
          email: "organizer@example.com",
          password: "password2024",
          account_type: "local",
          account_details: null,
          is_verified: true,
          is_profile_verified: false,
          createdAt: "2024-09-03T14:19:29.000Z",
          updatedAt: "2024-09-03T14:19:29.000Z",
        },
        organization: {
          id: "1eda04d7-71f7-4acc-ab15-3744688ecdc4",
          org_username: "scale-best-of-breed-systems",
          name: "scale best-of-breed systems",
          is_profile_verified: false,
          createdAt: "2024-09-03T14:19:29.000Z",
          updatedAt: "2024-09-03T14:19:29.000Z",
          role: "OWNER",
        },
      },
    });
  }

  if (authToken === "administrator") {
    // code in future
  }

  return new HttpResponse(
    JSON.stringify({
      status: "error",
      message: "Invalid token",
    }),
    { status: 401 },
  );
});
