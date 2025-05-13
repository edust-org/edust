import { defaultValues } from "@/configs"

import { ProfileDetailsCard } from "../components/profile-details-card"

export default async function ProfileByUsername({
  params,
}: {
  params: Promise<{ username: string }>
}) {
  const username = (await params).username

  const response = await fetch(
    `${defaultValues.backendURL}/api/v0/public/profile/username-${username}`,
  )
  const user = await response.json()

  return (
    <section className="grid h-svh place-items-center">
      <ProfileDetailsCard user={user.data} />
    </section>
  )
}
