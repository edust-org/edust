import { http, HttpResponse } from "msw";
import { apiUrlV0 } from "../../api-url";
import userDb from "./user-db";

const login = http.post(`${apiUrlV0}/auth/login`, async ({ request }) => {
  const actualBody = await request.clone().json();
  const { email, password } = actualBody;

  // Simulate user authentication
  if (email && password) {
    const users = {
      user: {
        email: "user@example.com",
        password: "password2024",
      },
      organizer: {
        email: "organizer@example.com",
        password: "password2024",
      },
      administrator: {
        email: "administrator@example.com",
        password: "password2024",
      },
    };

    if (users.user.email === email && users.user.password === password) {
      return new HttpResponse(JSON.stringify(userDb.user));
    }

    if (
      users.organizer.email === email &&
      users.organizer.password === password
    ) {
      return new HttpResponse(JSON.stringify(userDb.organizer));
    }

    if (
      users.administrator.email === email &&
      users.administrator.password === password
    ) {
      return new HttpResponse(JSON.stringify(userDb.administrator));
    }
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
