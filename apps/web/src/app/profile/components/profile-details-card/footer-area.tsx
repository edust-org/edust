"use client"

import { ShareButton } from "@/components"
import { CardFooter } from "@/components/ui"
import type { User } from "@/types"

type UserType = Pick<User, "id" | "username">

export default function Footer({ user }: { user: UserType }) {
  const profileLink = user.username
    ? `${window.origin}/profile/${user.username}`
    : `${window.origin}/profile?id=${user.id}`

  return (
    <CardFooter className="flex items-center justify-between gap-4">
      <ShareButton text={profileLink} />
    </CardFooter>
  )
}
