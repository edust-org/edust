"use client"

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
import { Avatar, AvatarFallback, AvatarImage } from "@edust/ui"
import { Building2, ChevronsUpDown } from "lucide-react"
import { useRouter } from "next/navigation"

export function ProfileSwitcher() {
  const router = useRouter()
  const state = useAuthStore()
  const profile = state.getActiveProfileOrg()
  const organization = profile?.organization

  const { isMobile } = useSidebar()

  if (!organization) {
    return null
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {organization && (
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar>
                  {organization.profilePic && (
                    <AvatarImage
                      src={organization.profilePic}
                      alt={organization.name}
                    />
                  )}
                  <AvatarFallback>
                    {organization.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {organization.name}
                  </span>
                  {/* <Badge className="text-[10px]">{organization.role}</Badge> */}
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
              Profiles
            </DropdownMenuLabel>
            {state.user?.profiles?.map((profile, index) => (
              <DropdownMenuItem
                key={profile.id + profile.organization.id}
                onClick={() => {
                  state.setActiveProfileOrg(profile.organization.orgUsername)
                  router.push(
                    `/student/orgs/${profile.organization.orgUsername}`,
                  )
                }}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-sm border">
                  <Building2 className="size-4 shrink-0" />
                </div>
                {profile.organization.name}
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
