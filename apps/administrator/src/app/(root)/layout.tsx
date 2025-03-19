"useClient"

import { NavbarRightMenus } from "@/components/navbar/navbar-right-menus"
import {
  Separator,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui"

import { AppSidebar } from "./components/app-sidebar"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <NavbarRightMenus />
        </header>
        <main>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
