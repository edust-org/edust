"use client"

import { useIsCollapsed } from "@/hooks"

import { Sidebar } from "./app-shell/sidebar"

export default function OrganizationsLayout({
  children,
}: {
  children: React.ReactNode
}) {
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
