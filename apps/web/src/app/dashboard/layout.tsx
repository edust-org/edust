"use client"

import { cn } from "@/utils"
import { useBoolean } from "usehooks-ts"

import { Navbar } from "./layout/navbar"
import { Sidebar } from "./layout/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { value: isOpen, toggle } = useBoolean(true)
  return (
    <>
      <Sidebar isOpen={isOpen} toggleIsOpen={toggle} />
      <main
        className={cn(
          "bg-background min-h-screen transition-[margin-left] duration-300 ease-in-out",
          isOpen === false ? "lg:ml-[90px]" : "lg:ml-72",
        )}
      >
        <Navbar title={"User Dashboard"} />
        <div className="px-4 pb-6 pt-6 sm:px-6">{children}</div>
      </main>
    </>
  )
}
