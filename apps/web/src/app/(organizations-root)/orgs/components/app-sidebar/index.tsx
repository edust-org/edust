"use client"

import { permissions } from "@/lib/pm"
import { useAuthStore } from "@/store"
import { PermissionValues } from "@edust/types"
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
  LucideIcon,
  Map,
  PieChart,
  Settings2,
  UserRoundCog,
  Users,
} from "lucide-react"
import { useSession } from "next-auth/react"
import { usePathname } from "next/navigation"
import { FaWpforms } from "react-icons/fa"
import { IconType } from "react-icons/lib"

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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const navMain: {
    title: string
    url: string
    icon?: LucideIcon | IconType
    isActive?: boolean
    permission?: PermissionValues
    items?: {
      title: string
      url: string
      isActive?: boolean
      permission?: PermissionValues
    }[]
  }[] = [
    {
      title: "Home",
      url: "/",
      icon: House,
    },
    {
      title: "Dashboard",
      url: "/orgs/:orgUsername",
      icon: LayoutDashboard,
    },
    {
      title: "Students",
      url: "/orgs/:orgUsername/students",
      icon: Users,
      permission: permissions.orgMenuStudents,
    },
    {
      title: "Quizzes",
      url: "/orgs/:orgUsername/quizzes",
      icon: FaWpforms,
      // permission: permissions.
    },
    {
      title: "Access Control",
      url: "/orgs/:orgUsername/access-control",
      icon: UserRoundCog,
      permission: permissions.orgMenuAccessControl,
    },
    {
      title: "Site",
      url: "/orgs/:orgUsername/site",
      icon: Earth,
      permission: permissions.orgMenuSite,
    },
    {
      title: "Settings",
      url: "/orgs/:orgUsername/settings",
      icon: Settings2,
      items: [
        {
          title: "Profile",
          url: "/orgs/:orgUsername/settings/profile",
        },
      ],
    },
  ]

  const state = useAuthStore()

  const pathname = usePathname()
  const orgUsername = state.getActiveOrg()?.orgUsername

  const organizations = state.user?.organizations || []

  // Get the rolePermissions from the active organization
  const userPermissions = state.getActiveOrg()?.rolePermissions

  if (orgUsername) {
    // Replace the placeholder in the URL with the actual username
    navMain.forEach((item) => {
      if (item.url.includes(":orgUsername")) {
        item.url = item.url.replace(":orgUsername", orgUsername)
      }
      item.isActive = pathname.startsWith(item.url)
      if (item.items) {
        item.items.forEach((subItem) => {
          if (subItem.url.includes(":orgUsername")) {
            subItem.url = subItem.url.replace(":orgUsername", orgUsername)
          }
          subItem.isActive = pathname.startsWith(subItem.url)
        })
      }
    })
  }

  // Filter navMain based on permissions
  const filteredNavMain = navMain.filter((item) => {
    // If no permission is required, allow the item
    if (!item.permission) return true

    // Check if the user has the required permission
    return userPermissions?.includes(item.permission)
  })

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {organizations && organizations.length > 0 && <OrgSwitcher />}
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
