"use client"

import { AvatarWithStatus } from "@/components"
import { useTheme } from "@/hooks"
import { useAuthStore } from "@/store"
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  Skeleton,
} from "@edust/ui"
import {
  CircleHelp,
  LayoutDashboard,
  LogOut,
  School,
  Settings,
} from "lucide-react"
import { signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { toast } from "sonner"

import { Organizations } from "./organizations"

export const RightMenus = () => {
  const { setTheme } = useTheme()

  const state = useAuthStore()
  const { logOut } = useAuthStore()

  const onlineUsers = useAuthStore((state) => state.onlineUsers)
  const { data, status } = useSession()
  const user = data?.user

  const handleLogout = async () => {
    await signOut()
    logOut()
    setTheme("light")
    toast.error("Log out successfully!")
  }

  if (status === "loading") {
    return <Skeleton className="h-8 w-8 rounded-full" />
  }

  return (
    <div className="flex items-center">
      {/* <ThemeSwitch /> */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            {user && (
              <AvatarWithStatus
                src={user.profilePic}
                alt={user.name}
                status={onlineUsers.has(user.id) ? "online" : "offline"}
              />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {user?.name || "unknown"}
              </p>
              <p className="text-muted-foreground text-xs leading-none">
                {user?.email || "unknown@email"}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <Link href={"/dashboard"}>
              <DropdownMenuItem>
                <LayoutDashboard className="mr-2 h-4 w-4" />
                <span>Dashboard</span>
              </DropdownMenuItem>
            </Link>
            <Link href={"/settings"}>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>

          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <CircleHelp className="mr-2 h-4 w-4" /> Help & support
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <Link href={"/help"}>
                    <DropdownMenuItem>Help</DropdownMenuItem>
                  </Link>
                  <Link href={"/dashboard/support"}>
                    <DropdownMenuItem>Support & Tickets</DropdownMenuItem>
                  </Link>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>

          <>
            {state.user?.profiles ? (
              <>
                {state.user?.profiles.length === 1 ? (
                  <Link
                    href={`/student/orgs/${state.user?.profiles[0]?.organization?.orgUsername}`}
                  >
                    <DropdownMenuItem>
                      <School className="mr-2 h-4 w-4" />
                      <span>{state.user?.profiles[0]?.organization?.name}</span>
                    </DropdownMenuItem>
                  </Link>
                ) : (
                  <Link href={"/student/orgs"}>
                    <DropdownMenuItem>
                      <School className="mr-2 h-4 w-4" />
                      <span>Student Profiles</span>
                    </DropdownMenuItem>
                  </Link>
                )}
              </>
            ) : (
              <></>
            )}
          </>

          {/* if organization available */}
          <>
            {state.user?.organizations ? (
              <>
                {" "}
                {state.user?.organizations &&
                state.user?.organizations.length === 1 ? (
                  <Link
                    href={`/orgs/${state.user?.organizations[0]?.orgUsername}`}
                  >
                    <DropdownMenuItem>
                      <School className="mr-2 h-4 w-4" />
                      <span>{state.user?.organizations[0]?.name}</span>
                    </DropdownMenuItem>
                  </Link>
                ) : (
                  <Link href={"/orgs"}>
                    <DropdownMenuItem>
                      <School className="mr-2 h-4 w-4" />
                      <span>Organizations</span>
                    </DropdownMenuItem>
                  </Link>
                )}
              </>
            ) : (
              <></>
            )}
          </>

          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
