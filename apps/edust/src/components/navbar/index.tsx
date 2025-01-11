import { useState } from "react"
import {
  Button,
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/"
import { LogoEdust, ThemeSwitch } from "@/components"
import { Link } from "react-router"
import { cn } from "@/utils"
import { NavMobile } from "./mobile"
import { NavbarRightMenus } from "./navbar-right-menus"
import { useAppSelector } from "@/app/hooks"

interface RouteProps {
  href: string
  label: string
}

const routeList: RouteProps[] = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/institutes",
    label: "Institutes",
  },
]

export const Navbar = () => {
  const isAuthenticated = useAppSelector(
    (state) => state.authentication.isAuthenticated,
  )
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <NavigationMenu className={cn("mx-auto !block max-w-full")}>
        <NavigationMenuList className="container flex h-14 w-screen justify-between px-4">
          <NavigationMenuItem className="flex font-bold">
            <Link
              rel="noreferrer noopener"
              to="/"
              className="ml-2 flex text-xl font-bold"
            >
              <LogoEdust width={100} />
            </Link>
          </NavigationMenuItem>

          {/* mobile */}
          <NavMobile />

          {/* desktop */}
          <nav className="hidden items-center gap-4 text-sm md:flex xl:gap-6">
            {routeList.map((route: RouteProps, i) => (
              <Link
                rel="noreferrer noopener"
                to={route.href}
                key={i}
                className={`text-foreground/80 transition-colors hover:text-foreground/80`}
              >
                {route.label}
              </Link>
            ))}
          </nav>

          <div className="hidden gap-2 md:flex">
            <ThemeSwitch />
            {isAuthenticated ? (
              <NavbarRightMenus />
            ) : (
              <Link to={"/auth/login"}>
                <Button>Login</Button>
              </Link>
            )}
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  )
}
