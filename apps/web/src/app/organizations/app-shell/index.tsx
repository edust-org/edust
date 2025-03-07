/*
 Why the app-shell?

 => In the context of a React application (especially with ShadCN UI), an AppShell component might include elements like:

Header: A top navigation bar with branding, user information, etc.
Sidebar: A menu or navigation on the side.
Main Content Area: Where the primary content of each page or section is rendered.
Footer: Optional footer with additional links or information.

 */
import { useIsCollapsed } from "@/hooks"

import { Sidebar } from "./sidebar"

export const AppShell = ({ children }: { children: React.ReactNode }) => {
  const [isCollapsed, setIsCollapsed] = useIsCollapsed()
  return (
    <div className="bg-background relative h-full overflow-hidden">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <main
        id="content"
        className={`overflow-x-hidden pt-16 transition-[margin] md:overflow-y-hidden md:pt-0 ${isCollapsed ? "md:ml-14" : "md:ml-64"} h-full`}
      >
        {children}
      </main>
    </div>
  )
}
