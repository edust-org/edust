import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

import { Roles } from "./types"

export default withAuth(
  function middleware(req) {
    if (!req.nextauth.token) {
      return NextResponse.redirect(new URL("/auth/login", req.url))
    }

    // Role-based access control
    if (req.nextUrl.pathname.startsWith("/organizations")) {
      const hasOrgOwner = req.nextauth.token.hasRoles?.organization

      if (!hasOrgOwner) {
        return NextResponse.redirect(new URL("/", req.url)) // Redirect unauthorized users
      }
    }

    return NextResponse.next()
  },
  {
    pages: { signIn: "/auth/login" },
  },
)

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/organizations",
    "/organizations/((?!create|profile).*)",
  ],
}
