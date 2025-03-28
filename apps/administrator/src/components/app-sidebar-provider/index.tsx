"use client"

import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui"
import { usePathname } from "next/navigation"

import { useMemo } from "react"

import { AppSidebar } from "./app-sidebar"

export function AppSidebarProvider({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()

  const ignoreAppSidebar = useMemo(() => ["/login"], [])

  if (ignoreAppSidebar.includes(pathname)) {
    return children
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
        </header>
        <main className="p-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
