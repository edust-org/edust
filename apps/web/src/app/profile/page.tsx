import "@/components/ui"
import { defaultValues } from "@/configs"
import { ProfileResponse } from "@/types"

import { ProfileDetailsCard } from "./components/profile-details-card"

export default async function Profile({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const userId = (await searchParams).id

  const response = await fetch(
    `${defaultValues.backendURL}/api/v0/public/profile/userId-${userId}`,
  )
  const user: ProfileResponse = await response.json()

  return (
    <section className="grid h-svh place-items-center">
      <ProfileDetailsCard user={user.data} />
    </section>
  )
}
