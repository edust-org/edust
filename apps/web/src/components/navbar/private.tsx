import assets from "@/assets/images"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { IoMenuSharp } from "react-icons/io5"

import { LogoEdust } from "../logo-edust"
import { NavbarRightMenus } from "./navbar-right-menus"

export const Private = () => {
  const { status } = useSession()

  return (
    <>
      <header className="bg-background sticky top-0 z-50 border-b bg-opacity-50 shadow-sm backdrop-blur-xl backdrop-filter">
        <div className="container flex h-[56px] w-full shrink-0 items-center justify-between px-4 md:px-6">
          <Link href="/" className="mr-6 hidden lg:flex">
            <LogoEdust />
            <span className="sr-only">Edust</span>
          </Link>
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              <NavigationMenuLink asChild>
                <Link
                  href="/"
                  className="bg-background hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                >
                  Home
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link
                  href="#"
                  className="bg-background hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                >
                  About
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link
                  href="#"
                  className="bg-background hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                >
                  Contact
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link
                  href="/playground"
                  className="bg-background hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                >
                  Playground
                </Link>
              </NavigationMenuLink>
            </NavigationMenuList>
          </NavigationMenu>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden">
                <IoMenuSharp className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetTitle>
                <Link href="/">
                  <img src={assets.logoDark} alt="LOGO" />
                  <span className="sr-only">Acme Inc</span>
                </Link>

                {/* start skip for warning */}
              </SheetTitle>
              <SheetHeader>
                <SheetDescription></SheetDescription>
              </SheetHeader>
              {/* end skip for warning */}

              <div className="grid gap-2 py-6">
                <Link
                  href="#"
                  className="flex w-full items-center py-2 text-lg font-semibold"
                >
                  Home
                </Link>
                <Link
                  href="#"
                  className="flex w-full items-center py-2 text-lg font-semibold"
                >
                  About
                </Link>
                <Link
                  href="#"
                  className="flex w-full items-center py-2 text-lg font-semibold"
                >
                  Services
                </Link>
                <Link
                  href="#"
                  className="flex w-full items-center py-2 text-lg font-semibold"
                >
                  Contact
                </Link>
              </div>
            </SheetContent>
          </Sheet>
          <div className="flex items-center gap-4">
            {status === "authenticated" ? (
              <NavbarRightMenus />
            ) : (
              <Link href={"/auth/login"}>
                <Button>Login</Button>
              </Link>
            )}
          </div>
        </div>
      </header>
    </>
  )
}
