import { Navbar } from "@/components";
import { Typography } from "@/components/ui";
import { Link } from "react-router-dom";
export const Playground = () => {
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
