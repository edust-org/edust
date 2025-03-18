"use client"

import {
  Separator,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
  Typography,
} from "@/components/ui"

import { AppSidebar } from "./components/app-sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <header>
              <Typography variant="h4">User Dashboard</Typography>
            </header>
          </div>
        </header>
        <main className="px-4 pb-6 pt-6 sm:px-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
