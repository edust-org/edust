import { Button, Typography } from "@edust/ui"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center px-4 py-12 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div className="w-full space-y-6 text-center">
        <div className="space-y-3">
          <Typography variant="h1" className="animate-bounce">
            404
          </Typography>
          <Typography>
            Sorry, we couldn’t find that page. It might have been moved or
            doesn't exist.{" "}
          </Typography>
        </div>
        <Link href="/" prefetch={false}>
          <Button> Return to website</Button>
        </Link>
      </div>
    </div>
  )
}
