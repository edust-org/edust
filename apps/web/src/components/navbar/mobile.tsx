"use client"

import { LogoEdust, ThemeSwitch } from "@/components"
import {
  Button,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
  buttonVariants,
} from "@/components/ui"
import { Separator } from "@radix-ui/react-dropdown-menu"
import { Menu } from "lucide-react"
import { useSession } from "next-auth/react"
import Link from "next/link"

import { useState } from "react"

import { Feedback } from "./feedback"
import { RightMenus } from "./right-menus"
import { RouteProps, routeList } from "./route-lists"

export const NavMobile = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { status } = useSession()
  return (
    <>
      <span className="flex gap-1 md:hidden">
        {status === "authenticated" && <RightMenus />}
        <ThemeSwitch />

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger className="px-2">
            <Menu
              className="flex h-5 w-5 md:hidden"
              onClick={() => setIsOpen(true)}
            >
              <span className="sr-only">Menu Icon</span>d
            </Menu>
          </SheetTrigger>

          <SheetContent side={"left"}>
            <SheetHeader>
              <LogoEdust className="mx-auto" width={100} />
              <Separator />
            </SheetHeader>
            <nav className="mt-4 flex flex-col items-center justify-center gap-2">
              {routeList.map(({ href, label }: RouteProps) => (
                <Link
                  rel="noreferrer noopener"
                  key={label}
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className={buttonVariants({ variant: "ghost" })}
                >
                  {label}
                </Link>
              ))}
              {status !== "authenticated" && (
                <Link href={"/auth/login"}>
                  <Button>Login</Button>
                </Link>
              )}
              <Feedback />
            </nav>
          </SheetContent>
        </Sheet>
      </span>
    </>
  )
}
