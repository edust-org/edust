import { LayoutDashboard, LogOut, Plus, School } from "lucide-react"
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
} from "@/components/ui"
import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { signOut } from "@/app/features/authentication"
import { Link, useNavigate } from "react-router"
import { useTheme } from "@/hooks"
import { Roles } from "@/types"
import { toast } from "sonner"
import { clearAllCaches } from "@/app/api/v0"

export const NavbarRightMenus = () => {
  const navigate = useNavigate()
  const { setTheme } = useTheme()
  const dispatch = useAppDispatch()
  const auth = useAppSelector((state) => state.authentication)

  const handleLogout = () => {
    dispatch(signOut())
    clearAllCaches(dispatch)
    setTheme("light")
    navigate("/")
    toast.error("Log out successfully!")
  }

  return (
    <div className="flex items-center">
      {/* <ThemeSwitch /> */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              {auth.user?.profilePic && (
                <AvatarImage src={auth.user?.profilePic} alt="user profile" />
              )}
              <AvatarFallback>SN</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {auth?.user?.name || "unknown"}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {auth?.user?.email || "unknown@email"}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <Link to={"/dashboard"}>
              <DropdownMenuItem>
                <LayoutDashboard className="mr-2 h-4 w-4" />
                <span>Dashboard</span>
              </DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>

          <DropdownMenuGroup>
            {/* if organization available */}
            {auth?.user?.organizationRoles &&
              auth?.user?.organizationRoles?.map((role) => (
                <Link to={"/organizations"} key={role.id}>
                  <DropdownMenuItem>
                    <School className="mr-2 h-4 w-4" />
                    <span
                      className={`capitalize ${role.role === Roles.OWNER && "font-bold"}`}
                    >
                      {role.organization.name.length > 21
                        ? role.organization.name.slice(0, 20) + "..."
                        : role.organization.name}
                    </span>
                  </DropdownMenuItem>
                </Link>
              ))}

            {/* if organization is not available */}
            {!auth?.user?.organizationRoles && (
              <Link to={"/organizations/create"}>
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
