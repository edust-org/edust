"use client"

import { useTheme } from "@/hooks"
import { useAuthStore } from "@/store"
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
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@edust/ui"
import { ChevronsUpDown, LogOut } from "lucide-react"
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { AvatarWithStatus } from "../avatar-with-status"

export const NavbarRightMenus = () => {
  const router = useRouter()
  const { setTheme } = useTheme()

  const { user, onlineUsers } = useAuthStore()
  const { logOut } = useAuthStore()

  const handleLogout = async () => {
    await signOut()
    logOut()
    setTheme("light")
    router.push("/")
    toast.error("Log out successfully!")
  }

  return (
    <div className="m-1 flex items-center rounded-2xl p-1 duration-300 hover:bg-slate-200">
      <div className="flex items-center gap-1">
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          {user && (
            <AvatarWithStatus
              src={user.profilePic}
              alt={user.name}
              status={onlineUsers.has(user.id) ? "online" : "offline"}
            />
          )}
        </Button>
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
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <ChevronsUpDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
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
