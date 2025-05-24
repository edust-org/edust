import {
  Button,
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@edust/ui"
import Link from "next/link"
import { IoMenuSharp } from "react-icons/io5"

import { LogoEdust } from "../logo-edust"

export const Guest = () => {
  return (
    <>
      <header>
        <div className="container flex h-[56px] w-full shrink-0 items-center justify-between bg-transparent px-4 md:px-6">
          <Link href="/" className="mr-6 hidden lg:flex">
            <LogoEdust />
            <span className="sr-only">Edust</span>
          </Link>
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              <NavigationMenuLink asChild>
                <Link href="/" className="p-2 text-sm font-medium">
                  Home
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link href="/institutes" className="p-2 text-sm font-medium">
                  Institutes
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link href="/about-us" className="p-2 text-sm font-medium">
                  About
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link href="/contact-us" className="p-2 text-sm font-medium">
                  Contact
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
                  <img src={"/images/logo/logo-dark.svg"} alt="" />
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
            <Link href={"/auth/login"}>
              <Button>Login</Button>
            </Link>
          </div>
        </div>
      </header>
    </>
  )
}
