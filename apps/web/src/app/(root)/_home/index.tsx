"use client"

import { useAppSelector } from "@/lib/store/hooks"

import { GuestHome } from "./guest-home"
import { PrivateHome } from "./private-home"

export const HomePage = () => {
  const { isAuthenticated } = useAppSelector((state) => state.authentication)
  return <div>{isAuthenticated ? <PrivateHome /> : <GuestHome />}</div>
}
