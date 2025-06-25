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
import Link from "next/link"

export default function Page() {
  const { user } = useAuthStore()
  const profiles = user?.profiles || []

  return (
    <div className="container">
      <div className="py-8">
        <Typography variant="h1">Your Organization Profiles</Typography>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {profiles.length > 0 &&
            profiles.map((profile) => (
              <Card key={profile.id + profile.orgStudentId}>
                <CardHeader>
                  <CardTitle>{profile.organization.name}</CardTitle>
                </CardHeader>
                <CardFooter>
                  <Link
                    href={`/student/orgs/${profile.organization.orgUsername}`}
                  >
                    <Button>View Profile</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
        </div>
      </div>
    </div>
  )
}
