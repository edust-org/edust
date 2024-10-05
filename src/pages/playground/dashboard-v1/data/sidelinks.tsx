import {
  TbApps,
  TbBarrierBlock,
  TbBox,
  TbChartHistogram,
  TbChecklist,
  TbComponents,
  TbError404,
  TbExclamationCircle,
  TbHexagonNumber1,
  TbHexagonNumber2,
  TbHexagonNumber3,
  TbHexagonNumber4,
  TbHexagonNumber5,
  TbLayoutDashboard,
  TbMessages,
  TbRouteAltLeft,
  TbServerOff,
  TbSettings,
  TbTruck,
  TbUserShield,
  TbUsers,
  TbLock,
} from "react-icons/tb";

export interface NavLink {
  title: string;
  label?: string;
  href: string;
  icon: JSX.Element;
}

export interface SideLink extends NavLink {
  sub?: NavLink[];
}

export const sidelinks: SideLink[] = [
  {
    title: "Dashboard",
    label: "",
    href: "/playground/dashboard",
    icon: <TbLayoutDashboard size={18} />,
  },
  {
    title: "Tasks",
    label: "3",
    href: "tasks",
    icon: <TbChecklist size={18} />,
  },
  {
    title: "Users",
    label: "",
    href: "users",
    icon: <TbUsers size={18} />,
  },
  {
    title: "Error Pages",
    label: "",
    href: "",
    icon: <TbExclamationCircle size={18} />,
    sub: [
      {
        title: "Not Found",
        label: "",
        href: "404",
        icon: <TbError404 size={18} />,
      },
      {
        title: "Internal Server Error",
        label: "",
        href: "500",
        icon: <TbServerOff size={18} />,
      },
      {
        title: "Maintenance Error",
        label: "",
        href: "503",
        icon: <TbBarrierBlock size={18} />,
      },
      {
        title: "Unauthorised Error",
        label: "",
        href: "401",
        icon: <TbLock size={18} />,
      },
    ],
  },
  {
    title: "Settings",
    label: "",
    href: "settings",
    icon: <TbSettings size={18} />,
  },
];
