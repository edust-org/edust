import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    if (!req.nextauth.token) {
      return NextResponse.redirect(new URL("/auth/login", req.url))
    }
    if (!req.nextauth.token?.userFlags?.system) {
      return NextResponse.redirect(new URL("/auth/unauthorize", req.url))
    }

    return NextResponse.next()
  },
  {
    pages: { signIn: "/auth/login" },
  },
)

export const config = {
  matcher: ["/:path*", "/auth/((?!login|unauthorize).*)"],
}
