"use client"

import { SessionProviderLoading } from "@/components"
import { SessionProvider as NextAuthSessionProvider } from "next-auth/react"

import { ReactNode } from "react"

export default function SessionProvider({ children }: { children: ReactNode }) {
  return (
    <NextAuthSessionProvider>
      <SessionProviderLoading>{children}</SessionProviderLoading>
    </NextAuthSessionProvider>
  )
}
