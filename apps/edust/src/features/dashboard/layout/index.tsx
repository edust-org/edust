import { useBoolean } from "usehooks-ts"
import { Sidebar } from "./sidebar"
import { cn } from "@/utils"
import { Navbar } from "./navbar"
import { Outlet } from "react-router"

export function Layout() {
  const { value: isOpen, toggle } = useBoolean(true)

  return (
    <>
      <Sidebar isOpen={isOpen} toggleIsOpen={toggle} />
      <main
        className={cn(
          "min-h-screen bg-background transition-[margin-left] duration-300 ease-in-out",
          isOpen === false ? "lg:ml-[90px]" : "lg:ml-72",
        )}
      >
        <Navbar title={"User Dashboard"} />
        <div className="px-4 pb-6 pt-6 sm:px-6">
          <Outlet />
        </div>
      </main>
    </>
  )
}

export default Layout
