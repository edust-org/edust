"use client"

import { usePathname } from "next/navigation"

export const useCheckActiveNav = () => {
  const pathname = usePathname()

  const checkActiveNav = (nav: string) => {
    const normalizedNav = nav.startsWith("/") ? nav : `/${nav}`
    const pathArray = pathname.split("/").filter((item) => item !== "")

    if (normalizedNav === "/orgs") {
      return pathArray.length === 1 && pathArray[0] === "orgs"
    }
    return (
      pathname === normalizedNav || pathname.startsWith(normalizedNav + "/")
    )
  }

  return { checkActiveNav }
}
