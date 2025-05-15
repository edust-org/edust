import { NavbarRightMenus } from "@/components/navbar/navbar-right-menus"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { defaultValues } from "@/configs"
import { permissions } from "@/lib/pm"
import { useAuthStore } from "@/store"
import { GalleryVerticalEnd, House } from "lucide-react"
import { usePathname } from "next/navigation"
import { useDebounceValue } from "usehooks-ts"

import * as React from "react"

import { SearchForm } from "../app-sidebar/search-form"
import { NavMain } from "./nav-main"

// This is sample data.
const navMain = [
  {
    title: "Home",
    url: "/",
    icon: House,
  },
  {
    title: "Getting Started",
    url: "#",
    items: [
      {
        title: "Installation",
        url: "#",
      },
      {
        title: "Project Structure",
        url: "#",
      },
    ],
  },
  {
    title: "  Users management",
    url: "#",
    permission: permissions.admMenuUsers,
    items: [
      {
        title: "Users",
        url: "/users",
      },
    ],
  },
  {
    title: "Organizations",
    url: "#",
    items: [
      {
        title: "Organizations",
        url: "/organizations",
      },
    ],
  },
  {
    title: "Institutes",
    url: "#",
    items: [
      {
        title: "Institutes",
        url: "/institutes",
      },
    ],
  },
  {
    title: "Feedback",
    url: "#",
    items: [
      {
        title: "Feedback",
        url: "/feedback",
      },
    ],
  },
  {
    title: "Help Center",
    url: "#",
    items: [
      {
        title: "Help center",
        url: "/help-center",
      },
    ],
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

  const state = useAuthStore()
  const userPermissions = state.user?.systemRole.rolePermissions

  const [search, setSearch] = useDebounceValue("", 500)

  // Filter navMain based on permissions
  const filteredNavMain = navMain
    .filter(
      (item) => !item.permission || userPermissions?.includes(item.permission),
    )
    .filter((item) => {
      const q = search.toLowerCase()
      if (!q) return true
      const inTitle = item.title.toLowerCase().includes(q)
      const inChildren = item.items?.some((sub) =>
        sub.title.toLowerCase().includes(q),
      )
      return inTitle || inChildren
    })

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <div className="flex items-center justify-between">
            <div>
              <SidebarMenuItem>
                <SidebarMenuButton size="lg" asChild>
                  <a href="#">
                    <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                      <GalleryVerticalEnd className="size-4" />
                    </div>
                    <div className="flex flex-col gap-0.5 leading-none">
                      <span className="font-semibold">Admin Panel</span>
                      <span className="">v{defaultValues.version}</span>
                    </div>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </div>
          </div>
        </SidebarMenu>
        <SearchForm
          onChange={(e) => setSearch((e.target as HTMLInputElement).value)}
        />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={filteredNavMain} pathname={pathname} />
        <div className="fixed bottom-0">
          <NavbarRightMenus />
        </div>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
