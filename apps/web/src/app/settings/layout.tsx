import { LogoEdust } from "@/components"
import { Separator } from "@edust/ui"
import Link from "next/link"

import { SidebarNav } from "./components/sidebar-nav"

interface SettingsLayoutProps {
  children: React.ReactNode
}

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/settings/profile",
  },
  {
    title: "Appearance",
    href: "/settings/appearance",
  },
]
export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
      <div className="container space-y-6 p-10 pb-16">
        <div className="space-y-0.5">
          <Link href={"/"}>
            <LogoEdust width={150} className="mb-4" />
          </Link>
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">Manage your account settings.</p>
        </div>
        <Separator className="my-6" />

        <div className="flex flex-col gap-4 lg:flex-row">
          <aside className="lg:min-w-52">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </>
  )
}
