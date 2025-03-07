import { ThemeSwitch } from "@/components"
import { NavbarRightMenus } from "@/components/navbar/navbar-right-menus"

import { SheetMenu } from "./sheet-menu"

interface NavbarProps {
  title: string
}

export function Navbar({ title }: NavbarProps) {
  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary sticky top-0 z-10 w-full shadow backdrop-blur">
      <div className="mx-4 flex h-14 items-center sm:mx-8">
        <div className="flex items-center space-x-4 lg:space-x-0">
          <SheetMenu />
          <h1 className="font-bold">{title}</h1>
        </div>
        <div className="flex flex-1 items-center justify-end">
          <ThemeSwitch />
          <NavbarRightMenus />
        </div>
      </div>
    </header>
  )
}
