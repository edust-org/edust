import { http, HttpResponse } from "msw";
import { apiUrlV0 } from "../../api-url";

const login = http.post(`${apiUrlV0}/auth/login`, async ({ request }) => {
  const actualBody = await request.clone().json();
  const { email, password } = actualBody;

  // Simulate user authentication
  if (email === "example@gmail.com" && password === "password") {
    return new HttpResponse(
      JSON.stringify({
        status: "success",
        message: "Logged in successfully!",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Set-Cookie": "authToken=example-user-auth-token-with-password", // Mocked cookie for authentication
        },
      },
    );
  } else {
    // Return a 401 Unauthorized response for invalid credentials
    return new HttpResponse(
      JSON.stringify({
        status: "error",
        message: "Invalid email or password.",
      }),
      { status: 401, headers: { "Content-Type": "application/json" } },
    );
  }
});

export const auth = [login];
