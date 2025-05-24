"use client"

import { Button, Card, Typography } from "@edust/ui"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

const InstituteNotFound = () => {
  const isAuthenticated = useSession().status === "authenticated"

  const router = useRouter()
  return (
    <Card className="max-w-96 p-8">
      <Typography affects="removePaddingMargin" variant="h2">
        Institutes not found
      </Typography>
      <Typography affects="removePaddingMargin" variant="p">
        If you want to create a new institute you need to register here.
      </Typography>
      <Button
        className="mt-4 w-full"
        onClick={() => {
          if (!isAuthenticated) {
            return router.push("/auth/login")
          }

          router.push("/dashboard/institutes/create")
        }}
      >
        Create new one
      </Button>
    </Card>
  )
}

export default InstituteNotFound
