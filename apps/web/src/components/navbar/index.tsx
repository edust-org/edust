import { LogoEdust, ThemeSwitch } from "@/components"
import {
  Button,
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  Skeleton,
} from "@/components/ui"
import { cn } from "@/utils"
import { useSession } from "next-auth/react"
import Link from "next/link"

import { Feedback } from "./feedback"
import { NavMobile } from "./mobile"
import { NavbarRightMenus } from "./navbar-right-menus"

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
  const { data: isAuthenticated, status } = useSession()

  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40 border-b backdrop-blur">
      <NavigationMenu className={cn("mx-auto !block max-w-full")}>
        <NavigationMenuList className="container flex h-14 justify-between px-4">
          <NavigationMenuItem className="flex font-bold">
            <Link
              rel="noreferrer noopener"
              href="/"
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
                href={route.href}
                key={i}
                className={`text-foreground/80 hover:text-foreground/80 transition-colors`}
              >
                {route.label}
              </Link>
            ))}
          </nav>

          <div className="hidden gap-2 md:flex">
            <Feedback />

            {status === "loading" ||
              (status == "unauthenticated" && <ThemeSwitch />)}
            {status === "loading" ? (
              <Skeleton className="h-8 w-12 rounded-full"></Skeleton>
            ) : isAuthenticated ? (
              <NavbarRightMenus />
            ) : (
              <Link href={"/auth/login"}>
                <Button>Login</Button>
              </Link>
            )}
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  )
}
