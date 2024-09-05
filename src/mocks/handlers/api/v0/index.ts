import { http, HttpResponse } from "msw";
import { apiUrlV0 } from "../api-url";
import { auth } from "./auth";

const user = http.get(`${apiUrlV0}/user`, ({ cookies }) => {
  if (!cookies.authToken) {
    return new HttpResponse(
      JSON.stringify({
        status: "error",
        message: "Unauthorized access",
      }),
      { status: 403 },
    );
  }

  // ...and respond to them using this JSON response.
  return HttpResponse.json({
    status: "success",
    message: "User Information",
    data: {
      user: {
        id: "b776d4ab-6e36-410a-8814-730f02e6e9db",
        name: "Administrator",
        username: "administrator",
        email: "administrator@example.com",
        password: "password",
        account_type: "local",
        account_details: null,
        is_verified: true,
        is_profile_verified: false,
        createdAt: "2024-09-03T14:19:29.000Z",
        updatedAt: "2024-09-03T14:19:29.000Z",
      },
    },
  });
});

export const apiV0 = [...auth, user];
