"use client"

import { permissions } from "@/lib/pm"
import { authService } from "@/services"
import { useAuthStore } from "@/store"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@edust/ui"
import {
  AudioWaveform,
  Command,
  Earth,
  Frame,
  GalleryVerticalEnd,
  House,
  LayoutDashboard,
  Map,
  PieChart,
  Settings2,
  UserRoundCog,
  Users,
} from "lucide-react"
import { usePathname } from "next/navigation"

import * as React from "react"

import { NavMain } from "./nav-main"
import { NavProjects } from "./nav-projects"
import { NavUser } from "./nav-user"
import { OrgSwitcher } from "./org-switcher"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

const navMain = [
  {
    title: "Home",
    url: "/",
    icon: House,
  },
  {
    title: "Dashboard",
    url: "/organizations",
    icon: LayoutDashboard,
  },
  {
    title: "Site",
    url: "/organizations/site",
    icon: Earth,
    permission: permissions.orgMenuSite,
  },
  {
    title: "Students",
    url: "/organizations/students",
    icon: Users,
    permission: permissions.orgMenuStudents,
  },
  {
    title: "Access Control",
    url: "/organizations/access-control",
    icon: UserRoundCog,
    permission: permissions.orgMenuAccessControl,
  },
  {
    title: "Settings",
    url: "/organizations/settings",
    icon: Settings2,
    items: [
      {
        title: "Profile",
        url: "/organizations/settings/profile",
      },
    ],
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const state = useAuthStore()

  const activeOrg = authService.findActiveOrganization(
    state.organizations,
    state.activeOrgId,
  )

  const pathname = usePathname()

  // Get the rolePermissions from the active organization
  const userPermissions = activeOrg?.rolePermissions || []

  // Filter navMain based on permissions
  const filteredNavMain = navMain.filter((item) => {
    // If no permission is required, allow the item
    if (!item.permission) return true

    // Check if the user has the required permission
    return userPermissions.includes(item.permission)
  })

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {state.organizations && state.organizations.length > 0 && (
          <OrgSwitcher />
        )}
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
