"use client"

import { Loading } from "@/components"
import { useSession } from "next-auth/react"


type LayoutHomeProps = {
  home: React.ReactNode
  homepublic: React.ReactNode
}

export default function LayoutHome({ home, homepublic }: LayoutHomeProps) {
  const { data, status } = useSession()
  const user = data?.user

  if (status === "loading") {
    return <Loading.FullScreen />
  }

  return <>{user ? home : homepublic}</>
}
