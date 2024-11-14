import { HttpResponse } from "msw"

class Token {
  constructor() {}

  isAuthenticated(request: Request) {
    const token = request.headers.get("Authorization")
    if (!token) {
      return new HttpResponse(
        JSON.stringify({
          status: "error",
          message: "Unauthorized access",
        }),
        { status: 403 },
      )
    }
  }

  isOrganizer(request: Request) {
    const token = request.headers.get("Authorization")
    if (!token) {
      return new HttpResponse(
        JSON.stringify({
          status: "error",
          message: "Unauthorized access",
        }),
        { status: 403 },
      )
    }

    if (token !== "ORGANIZER_TOKEN") {
      return new HttpResponse(
        JSON.stringify({
          status: "error",
          message: "Unauthorized access",
        }),
        { status: 403 },
      )
    }
  }
}
const token = new Token()
export default token
