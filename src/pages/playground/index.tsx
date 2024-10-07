import { clearProfileMode, setProfileActiveMode } from "@/app/features";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { Navbar } from "@/components";
import { Button, Typography } from "@/components/ui";
import { Link } from "react-router-dom";
export const Playground = () => {
  const profileSwitch = useAppSelector((state) => state.auth.profileSwitch);
  const dispatch = useAppDispatch();
  console.log(profileSwitch);

  return (
    <div className="space-y-8">
      <Navbar.Private />
      <Typography variant="list">
        {links.map((link, index) => (
          <li key={index}>
            <Link target="_blank" to={link.href}>
              {link.title}
            </Link>
          </li>
        ))}
      </Typography>

      <div>
        <Button
          onClick={() => {
            dispatch(clearProfileMode());
          }}
        >
          Clear Profile Switch
        </Button>
        <Button
          onClick={() => {
            dispatch(setProfileActiveMode("user"));
          }}
        >
          User
        </Button>
        <Button
          onClick={() => {
            dispatch(setProfileActiveMode("OWNER"));
          }}
        >
          OrgRole
        </Button>
      </div>
    </div>
  );
};
interface LinkTypes {
  title: string;
  href: string;
}
const links: LinkTypes[] = [
  {
    title: "Dashboard",
    href: "dashboard",
  },
  {
    title: "Table",
    href: "dashboard/tasks",
  },
  {
    title: "Coming Soon",
    href: "dashboard/users",
  },
  {
    title: "Settings",
    href: "dashboard/settings",
  },
];
