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

export default function Page() {
  const router = useRouter()
  const { user, setActiveProfileOrg } = useAuthStore()
  const profiles = user?.profiles || []

  return (
    <div className="container">
      <div className="py-8">
        <Typography variant="h1">Your Organization Profiles</Typography>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {profiles.length > 0 &&
            profiles.map((profile) => (
              <Card key={profile.id + profile.studentId}>
                <CardHeader>
                  <CardTitle>{profile.organization.name}</CardTitle>
                </CardHeader>
                <CardFooter>
                  <Button
                    onClick={() => {
                      setActiveProfileOrg(profile.organization.orgUsername)
                      router.push(
                        `/student/orgs/${profile.organization.orgUsername}`,
                      )
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
