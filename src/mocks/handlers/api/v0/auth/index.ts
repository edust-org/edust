import { http, HttpResponse } from "msw";
import { apiUrlV0 } from "../../api-url";

const login = http.post(`${apiUrlV0}/auth/login`, async ({ request }) => {
  const actualBody = await request.clone().json();
  const { email, password } = actualBody;

  // Simulate user authentication
  if (email && password) {
    const users = {
      guest: {
        email: "guest@example.com",
        password: "password",
      },
      organizer: {
        email: "organizer@example.com",
        password: "password",
      },
      administrator: {
        email: "administrator@example.com",
        password: "password",
      },
    };

    let authToken: string = "";

    if (users.guest.email === email && users.guest.password === password) {
      authToken = "guest";
    }

    if (
      users.organizer.email === email &&
      users.organizer.password === password
    ) {
      authToken = "organizer";
    }

    if (
      users.administrator.email === email &&
      users.administrator.password === password
    ) {
      authToken = "administrator";
    }

    return new HttpResponse(
      JSON.stringify({
        status: "success",
        message: "Logged in successfully!",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Set-Cookie": `authToken=${authToken}; Path=/;`, // Mocked cookie for authentication
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

const logout = http.delete(`${apiUrlV0}/auth/logout`, () => {
  return new HttpResponse(
    JSON.stringify({
      status: "success",
      message: "Logout successfully",
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie":
          "authToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;",
      },
    },
  );
});

export const auth = [login, logout];
