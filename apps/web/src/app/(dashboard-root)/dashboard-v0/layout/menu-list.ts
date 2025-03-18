import {
  Building2,
  LayoutGrid,
  LucideIcon,
  Settings,
  Users,
} from "lucide-react"

type Submenu = {
  href: string
  label: string
  active: boolean
}

type Menu = {
  href: string
  label: string
  active: boolean
  icon: LucideIcon
  submenus: Submenu[]
}

type Group = {
  groupLabel: string
  menus: Menu[]
}

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          active: pathname.includes("/dashboard"),
          icon: LayoutGrid,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard/institutes",
          label: "Institutes",
          active: pathname.includes("/institutes"),
          icon: Building2,
          submenus: [
            {
              href: "/dashboard/institutes",
              label: "List Of Institutes",
              active: pathname === "institutes",
            },
            {
              href: "/dashboard/institutes/create",
              label: "Create Institutes",
              active: pathname === "institutes/create",
            },
          ],
        },
      ],
    },
  ]
}
