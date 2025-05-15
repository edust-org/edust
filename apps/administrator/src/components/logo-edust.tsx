"use client"

import { useThemeStore } from "@/store"
import { detectTheme } from "@/utils"

interface LogoEdustProps {
  iconMode?: boolean
  width?: number
  height?: number
  className?: string
}

export const LogoEdust = ({
  iconMode = false,
  width = 120,
  height,
  className,
}: LogoEdustProps) => {
  const theme = useThemeStore((state) => state.theme)

  const logos = {
    light: "/images/logo/logo-light.svg",
    dark: "/images/logo/logo-dark.svg",
    lightIcon: "/images/logo/logo-light-box.svg",
    darkIcon: "/images/logo/logo-dark-box.svg",
  }

  const logosAlt = {
    light: "Edust Org",
    dark: "Edust Org",
    lightIcon: "Edust Org Icon Logo",
    darkIcon: "Edust Org Icon Logo",
  }

  if (iconMode) {
    if (detectTheme(theme) == "light") {
      return (
        <img
          src={logos.lightIcon}
          alt={logosAlt.lightIcon}
          width={width}
          height={height}
          className={className}
        />
      )
    }
    if (detectTheme(theme) == "dark") {
      return (
        <img
          src={logos.darkIcon}
          alt={logosAlt.darkIcon}
          width={width}
          height={height}
          className={className}
        />
      )
    }
  } else {
    if (detectTheme(theme) == "light") {
      return (
        <img
          src={logos.light}
          alt={logosAlt.light}
          width={width}
          height={height}
          className={className}
        />
      )
    }
    if (detectTheme(theme) == "dark") {
      return (
        <img
          src={logos.dark}
          alt={logosAlt.dark}
          width={width}
          height={height}
          className={className}
        />
      )
    }
  }
}
