import { Card, CardContent, CardHeader, Typography } from "@/components/ui"
import { User } from "@/types"
import { Gender } from "@/types/common"
import Image from "next/image"

import Footer from "./footer-area"

type UserType = Pick<User, "id" | "name" | "username" | "profilePic"> & {
  gender: Gender | null
}

export default function ProfileDetailsCard({ user }: { user: UserType }) {
  return (
    <Card className="min-w-xs max-w-sm">
      <CardHeader>
        <div className="mx-auto grid h-24 w-24 place-items-center overflow-hidden rounded-full border shadow-sm dark:bg-white">
          <Image
            src={
              user.profilePic ||
              "https://asset.cloudinary.com/dbaa3pxau/93ec921257b19a711e108cb6b554f5b7"
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
      {user.gender && (
        <CardContent>
          <Typography className="capitalize">{user.gender}</Typography>
        </CardContent>
      )}
      <Footer user={user} />
    </Card>
  )
}
