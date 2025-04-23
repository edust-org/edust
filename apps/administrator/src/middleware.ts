import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

import { Roles } from "./types"

export default withAuth(
  function middleware(req) {
    if (!req.nextauth.token) {
      return NextResponse.redirect(new URL("/login", req.url))
    }
    if (req.nextauth.token?.systemRole !== Roles.administrator) {
      return NextResponse.redirect(new URL("/unauthorize", req.url))
    }

    return NextResponse.next()
  },
  {
    pages: { signIn: "/login" },
  },
)

export const config = {
  matcher: ["/:path*"],
}
