import { ProfileResponse } from "@/types"
import { Card, CardContent, CardHeader, CardTitle, Typography } from "@edust/ui"
import Image from "next/image"
import Link from "next/link"

import Footer from "./footer-area"

interface ProfileDetailsCardProps {
  user: ProfileResponse["data"]
}

export const ProfileDetailsCard: React.FC<ProfileDetailsCardProps> = ({
  user,
}) => {
  return (
    <Card className="min-w-xs w-full max-w-lg">
      <CardHeader>
        <div className="mx-auto grid h-24 w-24 place-items-center overflow-hidden rounded-full border shadow-sm dark:bg-white">
          <Image
            src={
              user.profilePic ||
              "https://res.cloudinary.com/dbaa3pxau/image/upload/v1731123273/profile_pic_zqp0tm.svg"
            }
            width={100}
            height={100}
            alt={user.name}
          />
        </div>

        <Typography variant="h4" className="text-center capitalize">
          {user.name}
        </Typography>
      </CardHeader>

      <CardContent>
        {user.gender && (
          <Typography className="capitalize">{user.gender}</Typography>
        )}

        {user.academics &&
          user.academics.map((academy) => (
            <Card key={academy.id} className="mb-4">
              <CardHeader>
                <Image
                  src={
                    academy.profilePic ||
                    "https://asset.cloudinary.com/dbaa3pxau/93ec921257b19a711e108cb6b554f5b7"
                  }
                  width={100}
                  height={100}
                  alt={academy.name}
                />
                <CardTitle>
                  <Link
                    href={`/organizations/profile/${academy.orgUsername}`}
                    className="capitalize"
                  >
                    {academy.name}
                  </Link>
                </CardTitle>
              </CardHeader>
            </Card>
          ))}
      </CardContent>
      <Footer user={user} />
    </Card>
  )
}
