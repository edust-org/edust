"use client"

import { useSession } from "next-auth/react"
import Image from "next/image"

import React from "react"

export const SessionProviderLoading = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { status } = useSession()

  if (status === "loading") {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <Image
          src={"/images/logo/logo-light-box.svg"}
          alt="logo"
          width={100}
          height={100}
        />
        <span className="sr-only">Edust</span>
      </div>
    )
  }

  return <>{children}</>
}
