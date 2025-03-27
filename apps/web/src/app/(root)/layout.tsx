"use client"

import { useSession } from "next-auth/react"

import { ReactNode } from "react"

interface LayoutHomeProps {
  home: ReactNode
  homepublic: ReactNode
}

export default function LayoutHome({ home, homepublic }: LayoutHomeProps) {
  const { data } = useSession()
  const user = data?.user
  return <>{user ? home : homepublic}</>
}
