import { http, HttpResponse } from "msw"
import { apiUrlV0 } from "../../api-url"
import userDB from "./db/user.json"
import organizerDB from "./db/organizer.json"
import systemEditorDB from "./db/system-editor.json"
import administratorDB from "./db/administrator.json"

const login = http.post(`${apiUrlV0}/auth/login`, async ({ request }) => {
  const actualBody = await request.clone().json()
  const { email, password } = actualBody

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
      systemEditor: {
        email: "systemeditor@example.com",
        password: "password2024",
      },
    }

    if (users.user.email === email && users.user.password === password) {
      return HttpResponse.json(userDB)
    }

    if (
      users.organizer.email === email &&
      users.organizer.password === password
    ) {
      return HttpResponse.json(organizerDB)
    }

    if (
      users.administrator.email === email &&
      users.administrator.password === password
    ) {
      return HttpResponse.json(administratorDB)
    }
    if (
      users.systemEditor.email === email &&
      users.systemEditor.password === password
    ) {
      return HttpResponse.json(systemEditorDB)
    }
  } else {
    // Return a 401 Unauthorized response for invalid credentials
    return HttpResponse.json(
      {
        status: "error",
        message: "Invalid email or password.",
      },
      { status: 401 },
    )
  }
})

export const auth = [login]
