import { ThemeSwitch, LogoEdust } from "@/components"
import {
  Button,
  buttonVariants,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui"
import { Separator } from "@radix-ui/react-dropdown-menu"
import { Menu } from "lucide-react"
import { Link } from "react-router"
import { routeList, RouteProps } from "./route-lists"
import { useState } from "react"
import { NavbarRightMenus } from "./navbar-right-menus"

export const NavMobile = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  return (
    <>
      <span className="flex gap-1 md:hidden">
        <NavbarRightMenus />
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
                  to={href}
                  onClick={() => setIsOpen(false)}
                  className={buttonVariants({ variant: "ghost" })}
                >
                  {label}
                </Link>
              ))}
              <Link to={"/auth/login"}>
                <Button>Login</Button>
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </span>
    </>
  )
}
