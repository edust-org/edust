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
import { clearAllCaches } from "@/lib/store/api/v0"
import { logOut } from "@/lib/store/features/authentication"
import { useAppDispatch } from "@/lib/store/hooks"
import { Roles } from "@/types"
import {
  ChevronsUpDown,
  LayoutDashboard,
  LogOut,
  Plus,
  School,
} from "lucide-react"
import { signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export const NavbarRightMenus = () => {
  const router = useRouter()
  const { setTheme } = useTheme()
  const dispatch = useAppDispatch()

  const { data, status } = useSession()
  const user = data?.user

  const handleLogout = () => {
    signOut()
    dispatch(logOut())
    clearAllCaches(dispatch)
    setTheme("light")
    router.push("/")
    toast.error("Log out successfully!")
  }

  if (status === "loading") {
    return <Skeleton className="h-8 w-8 rounded-full" />
  }

  return (
    <div className="flex items-center rounded-2xl p-1 m-1 duration-300 hover:bg-slate-200">
      <div className="flex items-center gap-1">
        <Avatar className="h-8 w-8">
          {user?.profilePic ? (
            <AvatarImage src={user?.profilePic} alt="user profile" />
          ) : (
            <AvatarFallback>SN</AvatarFallback>
          )}
        </Avatar>
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
