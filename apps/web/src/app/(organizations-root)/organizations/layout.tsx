import {
  Separator,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
  Typography,
} from "@/components/ui"

import { AppSidebar } from "./components/app-sidebar"

export default function OrganizationsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <div>
              <Typography variant="h4">Organizations Dashboard</Typography>
            </div>
          </div>
        </header>
        <main className="px-4 pb-6 pt-6 sm:px-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
