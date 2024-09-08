import { NavLink as RouterNavLink } from "react-router-dom";

export const NavLink = ({ to, children }) => {
  const activeLinkStyle = `flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary`;
  const inActiveLinkStyle = `flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary`;
  return (
    <RouterNavLink
      end
      to={to}
      className={({ isActive, isPending }) =>
        isPending
          ? inActiveLinkStyle
          : isActive
            ? activeLinkStyle
            : inActiveLinkStyle
      }
    >
      {children}
    </RouterNavLink>
  );
};
