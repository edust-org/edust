import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetHeader,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import assets from "@/assets/images";
import { IoMenuSharp } from "react-icons/io5";
import { useAppSelector } from "@/app/hooks";
import { NavbarRightMenus } from "./navbar-right-menus";
import { LogoEdust } from "../logo-edust";

export const Private = () => {
  const auth = useAppSelector((state) => state.auth.authentication);

  return (
    <>
    <header className="sticky top-0 z-50 border-b bg-background bg-opacity-50 shadow-sm backdrop-blur-xl backdrop-filter">
      <div className="container flex h-[56px] w-full shrink-0 items-center justify-between px-4 md:px-6">
        <Link to="/" className="mr-6 hidden lg:flex">
          <LogoEdust />
          <span className="sr-only">Edust</span>
        </Link>
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            <NavigationMenuLink asChild>
              <Link
                to="/"
                className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
              >
                Home
              </Link>
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
              <Link
                to="#"
                className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
              >
                About
              </Link>
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
              <Link
                to="#"
                className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
              >
                Contact
              </Link>
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
              <Link
                to="/playground"
                className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
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
              <Link to="/">
                <img src={assets.logo} alt="" />
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
                to="#"
                className="flex w-full items-center py-2 text-lg font-semibold"
              >
                Home
              </Link>
              <Link
                to="#"
                className="flex w-full items-center py-2 text-lg font-semibold"
              >
                About
              </Link>
              <Link
                to="#"
                className="flex w-full items-center py-2 text-lg font-semibold"
              >
                Services
              </Link>
              <Link
                to="#"
                className="flex w-full items-center py-2 text-lg font-semibold"
              >
                Contact
              </Link>
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-4">
          {auth.isAuthenticated ? (
            <NavbarRightMenus />
          ) : (
            <Link to={"/auth/sign-in"}>
              <Button>Sign In</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
    </>
  );
};
