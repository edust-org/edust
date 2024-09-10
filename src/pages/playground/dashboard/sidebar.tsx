import { Link } from "react-router-dom";

import { cn } from "@/utils";
import { Button } from "@/components/ui/button";
import { Menu } from "./menu";
import { SidebarToggle } from "./sidebar-toggle";
import assets from "@/assets/images";

export function Sidebar({
  toggleIsOpen,
  isOpen,
}: {
  isOpen: boolean;
  toggleIsOpen: () => void;
}) {
  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-20 h-screen -translate-x-full transition-[width] duration-300 ease-in-out lg:translate-x-0",
        isOpen === false ? "w-[90px]" : "w-72",
      )}
    >
      <SidebarToggle isOpen={isOpen} setIsOpen={toggleIsOpen} />
      <div className="relative flex h-full flex-col overflow-y-auto px-3 py-4 shadow-md dark:shadow-zinc-800">
        <Button
          className={cn(
            "mb-1 transition-transform duration-300 ease-in-out",
            isOpen === false ? "translate-x-1" : "translate-x-0",
          )}
          variant="link"
          asChild
        >
          <Link to="/" className="flex items-center gap-2">
            {isOpen ? (
              <img src={assets.logo} className="mr-1" />
            ) : (
              <img src={assets.logoIcon} className="mr-1" />
            )}
          </Link>
        </Button>
        <Menu isOpen={isOpen} />
      </div>
    </aside>
  );
}
