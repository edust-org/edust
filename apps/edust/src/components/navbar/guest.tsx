import assets from "@/assets/images";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { IoMenuSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { LogoEdust } from "../logo-edust";

export const Guest = () => {
  return (
    <>
      <header>
        <div className="container flex h-[56px] w-full shrink-0 items-center justify-between bg-transparent px-4 md:px-6">
          <Link to="/" className="mr-6 hidden lg:flex">
            <LogoEdust />
            <span className="sr-only">Edust</span>
          </Link>
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              <NavigationMenuLink asChild>
                <Link to="/" className="p-2 text-sm font-medium">
                  Home
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link to="/institutes" className="p-2 text-sm font-medium">
                  Institutes
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link to="/about-us" className="p-2 text-sm font-medium">
                  About
                </Link>
              </NavigationMenuLink>
              <NavigationMenuLink asChild>
                <Link to="/contact-us" className="p-2 text-sm font-medium">
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
            <Link to={"/auth/sign-in"}>
              <Button>Sign In</Button>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};
