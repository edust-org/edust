import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    if (!req.nextauth.token) {
      return NextResponse.redirect(new URL("/auth/login", req.url))
    }

    // Role-based access control
    if (req.nextUrl.pathname.startsWith("/organizations")) {
      const hasOrgOwner = req.nextauth.token.userFlags?.organization

      if (!hasOrgOwner) {
        return NextResponse.redirect(new URL("/", req.url)) // Redirect unauthorized users
      }
    }

    if (req.nextUrl.pathname.startsWith("/academics")) {
      const isStudent = req.nextauth.token.userFlags?.student

      if (!isStudent) {
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
    "/academics/:path*",
    "/dashboard/:path*",
    "/organizations",
    "/organizations/((?!create|profile).*)",
  ],
}
