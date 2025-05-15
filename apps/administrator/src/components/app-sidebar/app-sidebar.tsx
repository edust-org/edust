"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { defaultValues } from "@/configs"
import { PermissionValues, permissions } from "@/lib/pm"
import { authService } from "@/services"
import { useAuthStore } from "@/store"
import {
  AudioWaveform,
  BadgeHelp,
  BotMessageSquare,
  Building2,
  Command,
  Earth,
  Frame,
  GalleryVerticalEnd,
  House,
  LayoutDashboard,
  LucideIcon,
  Map,
  MessageSquareX,
  PieChart,
  School,
  Settings2,
  UserRoundCog,
  Users,
  UsersRound,
} from "lucide-react"
import { usePathname } from "next/navigation"
import { useDebounceValue } from "usehooks-ts"

import * as React from "react"

import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"
import { SearchForm } from "./search-form"

export type NavItem = {
  title: string
  url: string
  icon?: LucideIcon
  isActive?: boolean
  permission?: PermissionValues
  items?: {
    title: string
    url: string
  }[]
}

// This is sample data.
const navMain: NavItem[] = [
  {
    title: "Home",
    url: "/",
    icon: House,
  },
  {
    title: "  Users management",
    url: "/users",
    icon: UsersRound,
    permission: permissions.admMenuUsers,
  },
  {
    title: "Organizations",
    url: "/organizations",
    icon: Building2,
  },
  {
    title: "Institutes",
    url: "/institutes",
    icon: School,
  },
  {
    title: "Feedback",
    url: "/feedback",
    icon: MessageSquareX,
  },
  {
    title: "Help Center",
    url: "/help-center",
    icon: BadgeHelp,
  },
  {
    title: "Support",
    url: "/support",
    icon: BotMessageSquare,
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
    <Sidebar collapsible="icon" {...props}>
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
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        {state.user && (
          <NavUser
            user={{
              id: state.user.id,
              isActive: state.onlineUsers.has(state.user.id),
              name: state.user?.name,
              avatar: state.user?.profilePic || "/images/avatar.png",
              email: state.user?.email,
            }}
          />
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
