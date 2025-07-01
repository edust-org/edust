"use client"

import { AvatarWithStatus } from "@/components"
import { useAuthStore } from "@/store"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@edust/ui"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@edust/ui"
import { Badge } from "@edust/ui"
import { Building2, ChevronsUpDown } from "lucide-react"
import { useRouter } from "next/navigation"

import * as React from "react"

export function OrgSwitcher() {
  const router = useRouter()

  const state = useAuthStore()
  const activeOrg = state.getActiveOrg()

  const { isMobile } = useSidebar()

  if (!activeOrg) {
    return null
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {activeOrg && (
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <AvatarWithStatus
                  src={activeOrg.profilePic}
                  alt={activeOrg.name}
                  status={"online"}
                />
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {activeOrg.name}
                  </span>
                  <Badge className="text-[10px]">{activeOrg.role}</Badge>
                </div>
                <ChevronsUpDown className="ml-auto" />
              </SidebarMenuButton>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">
              Organizations
            </DropdownMenuLabel>
            {state.user?.organizations?.map((org, index) => (
              <DropdownMenuItem
                key={org.id}
                onClick={() => {
                  state.setActiveOrg(org.orgUsername)
                  router.push(`/orgs/${org.orgUsername}`)
                }}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-sm border">
                  <Building2 className="size-4 shrink-0" />
                </div>
                {org.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            {/* <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2">
              <div className="bg-background flex size-6 items-center justify-center rounded-md border">
                <Plus className="size-4" />
              </div>
              <div className="text-muted-foreground font-medium">Add team</div>
            </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
