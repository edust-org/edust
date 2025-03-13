import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Typography,
} from "@/components/ui"
import { defaultValues } from "@/configs"
import Image from "next/image"
import Link from "next/link"

import CopyOrgProfileLink from "./copy-org-profile-link"
import profileFallback from "./organizations-profile-fallback.svg"

export default async function OrganizationByOrgUsername({
  params,
}: {
  params: Promise<{ orgUsername: string }>
}) {
  const { orgUsername } = await params
  const response = await fetch(
    `${defaultValues.backendURL}/api/v0/public/organizations/orgUsername-${orgUsername}`,
  )
  const organization = await response.json()

  return (
    <section className="grid h-svh place-items-center">
      <Card className="min-w-xs max-w-sm">
        <CardHeader>
          <div className="mx-auto grid h-24 w-24 place-items-center overflow-hidden rounded-full border shadow-sm">
            <Image
              src={organization.data.profilePic || profileFallback}
              width={100}
              height={100}
              alt={organization.data.name}
            />
          </div>

          <Typography variant="h4" className="text-center capitalize">
            {organization.data.name}
          </Typography>
        </CardHeader>
        {organization.data.location && (
          <CardContent>
            <Typography className="capitalize">
              {organization.data.location}
            </Typography>
          </CardContent>
        )}
        <CardFooter className="flex items-center justify-between gap-4">
          <Link
            href={`/org/${organization.data.orgUsername}/site`}
            target="_blank"
          >
            <Button variant={"link"} size={"icon"}>
              <svg
                viewBox="0 0 64 64"
                xmlns="http://www.w3.org/2000/svg"
                strokeWidth="3"
                stroke="currentColor"
                fill="none"
              >
                <path d="M39.93,55.72A24.86,24.86,0,1,1,56.86,32.15a37.24,37.24,0,0,1-.73,6" />
                <path d="M37.86,51.1A47,47,0,0,1,32,56.7" />
                <path d="M32,7A34.14,34.14,0,0,1,43.57,30a34.07,34.07,0,0,1,.09,4.85" />
                <path d="M32,7A34.09,34.09,0,0,0,20.31,32.46c0,16.2,7.28,21,11.66,24.24" />
                <line x1="10.37" y1="19.9" x2="53.75" y2="19.9" />
                <line x1="32" y1="6.99" x2="32" y2="56.7" />
                <line x1="11.05" y1="45.48" x2="37.04" y2="45.48" />
                <line x1="7.14" y1="32.46" x2="56.86" y2="31.85" />
                <path d="M53.57,57,58,52.56l-8-8,4.55-2.91a.38.38,0,0,0-.12-.7L39.14,37.37a.39.39,0,0,0-.46.46L42,53.41a.39.39,0,0,0,.71.13L45.57,49Z" />
              </svg>
            </Button>
          </Link>

          <CopyOrgProfileLink username={organization.data.orgUsername} />
        </CardFooter>
      </Card>
    </section>
  )
}
