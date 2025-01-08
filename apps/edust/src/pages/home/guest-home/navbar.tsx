import { useState } from "react"
import {
  Button,
  buttonVariants,
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/"
import { Menu } from "lucide-react"
import { LogoEdust, ThemeSwitch } from "@/components"
import { Link } from "react-router"
import { cn } from "@/utils"

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
  const [isOpen, setIsOpen] = useState<boolean>(false)
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
          <span className="flex md:hidden">
            <ThemeSwitch />

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger className="px-2">
                <Menu
                  className="flex h-5 w-5 md:hidden"
                  onClick={() => setIsOpen(true)}
                >
                  <span className="sr-only">Menu Icon</span>
                </Menu>
              </SheetTrigger>

              <SheetContent side={"left"}>
                <SheetHeader>
                  <LogoEdust className="mx-auto" width={100} />
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
            <Link to={"/auth/login"}>
              <Button>Login</Button>
            </Link>

            <ThemeSwitch />
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  )
}
