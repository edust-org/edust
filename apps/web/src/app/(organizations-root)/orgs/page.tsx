"use client"

import { useAuthStore } from "@/store"
import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
  Typography,
} from "@edust/ui"
import { useRouter } from "next/navigation"

export default function Organizations() {
  const router = useRouter()
  const { user, setActiveOrg } = useAuthStore()
  const organizations = user?.organizations || []

  return (
    <div className="container">
      <div className="py-8">
        <Typography variant="h1">Your Organization Profiles</Typography>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {organizations.length > 0 &&
            organizations.map((org) => (
              <Card key={org.id + org.roleId}>
                <CardHeader>
                  <CardTitle>{org.name}</CardTitle>
                </CardHeader>
                <CardFooter>
                  <Button
                    onClick={() => {
                      setActiveOrg(org.orgUsername)
                      router.push(`/orgs/${org.orgUsername}`)
                    }}
                  >
                    View Profile
                  </Button>
                </CardFooter>
              </Card>
            ))}
        </div>
      </div>
    </div>
  )
}
