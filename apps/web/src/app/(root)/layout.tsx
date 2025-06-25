import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"

type LayoutHomeProps = {
  home: React.ReactNode
  homepublic: React.ReactNode
}

export default async function LayoutHome({
  home,
  homepublic,
}: LayoutHomeProps) {
  const session = await getServerSession(authOptions)
  const user = session?.user
  return <>{user ? home : homepublic}</>
}
