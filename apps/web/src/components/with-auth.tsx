"use client"

import { useAppSelector } from "@/lib/store/hooks"
import { redirect } from "next/navigation"

import React, { JSX, useEffect } from "react"

interface WithAuthProps {
  [key: string]: unknown
}

export function withAuth<P extends WithAuthProps>(
  Component: React.ComponentType<P>,
) {
  const Wrapper = (props: P): JSX.Element => {
    const { token } = useAppSelector((state) => state.authentication.auth)

    useEffect(() => {
      if (!token) {
        redirect("/auth/login")
      }
    }, [token])

    // If no token is found, do not render the component yet
    if (!token) {
      return <></>
    }

    return <Component {...props} />
  }

  return Wrapper
}
