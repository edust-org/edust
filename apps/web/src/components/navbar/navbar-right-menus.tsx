"use client"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  Skeleton,
} from "@/components/ui"
import { useTheme } from "@/hooks"
import { useAuthStore } from "@/lib/store"
import { LayoutDashboard, LogOut, Plus, School, Settings } from "lucide-react"
import { signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export const NavbarRightMenus = () => {
  const router = useRouter()
  const { setTheme } = useTheme()

  const state = useAuthStore()
  const { logOut } = useAuthStore()

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
            <Avatar className="h-8 w-8 border">
              {user?.profilePic ? (
                <AvatarImage
                  src={user?.profilePic}
                  alt="user profile"
                  referrerPolicy={"no-referrer"}
                />
              ) : (
                <AvatarFallback>SN</AvatarFallback>
              )}
            </Avatar>
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
            {/* if organization available */}
            {state.organizations &&
              state.organizations.map((org) => {
                return (
                  <DropdownMenuItem
                    key={org.id}
                    onClick={() => {
                      state.setActiveOrg(org.id)
                      router.push("/organizations")
                    }}
                  >
                    <School className="mr-2 h-4 w-4" />
                    <span className={`capitalize`}>
                      {org.name.length > 21
                        ? org.name.slice(0, 20) + "..."
                        : org.name}
                    </span>
                  </DropdownMenuItem>
                )
              })}

            {/* if organization is not available */}
            {!state?.organizations && (
              <Link href={"/organizations/create"}>
                <DropdownMenuItem>
                  <Plus className="mr-2 h-4 w-4" />
                  <span>Create Organizations</span>
                </DropdownMenuItem>
              </Link>
            )}
          </DropdownMenuGroup>
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
