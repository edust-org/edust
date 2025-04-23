"use client"

import { Loading } from "@/components"
import { useSession } from "next-auth/react"

import { ReactNode } from "react"

interface LayoutHomeProps {
  home: ReactNode
  homepublic: ReactNode
}

export default function LayoutHome({ home, homepublic }: LayoutHomeProps) {
  const { data, status } = useSession()
  const user = data?.user

  if (status === "loading") {
    return <Loading.FullScreen />
  }

  return <>{user ? home : homepublic}</>
}
