"use client"

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
  Frame,
  GalleryVerticalEnd,
  House,
  LayoutDashboard,
  LucideIcon,
  Map,
  PieChart,
} from "lucide-react"
import { usePathname } from "next/navigation"

import * as React from "react"

import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"
import { ProfileSwitcher } from "./profile-switcher"

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

const navMain: {
  title: string
  url: string
  icon?: LucideIcon
  isActive?: boolean
  items?: {
    title: string
    url: string
    isActive?: boolean
  }[]
}[] = [
  {
    title: "Home",
    url: "/",
    icon: House,
  },
  {
    title: "Dashboard",
    url: "/student/orgs/:username",
    icon: LayoutDashboard,
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const state = useAuthStore()

  const pathname = usePathname()
  const username = state.getActiveProfileOrg()?.organization.orgUsername
  const profiles = state.user?.profiles || []

  if (username) {
    // Replace the placeholder in the URL with the actual username
    navMain.forEach((item) => {
      if (item.url.includes(":username")) {
        item.url = item.url.replace(":username", username)
      }
      item.isActive = pathname.startsWith(item.url)
      if (item.items) {
        item.items.forEach((subItem) => {
          subItem.isActive = pathname.startsWith(
            subItem.url.replace(":username", username),
          )
        })
      }
    })
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {profiles.length > 0 && <ProfileSwitcher />}
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} pathname={pathname} />
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
