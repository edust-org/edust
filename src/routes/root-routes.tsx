import { useAppSelector } from "@/app/hooks";
import { Routes } from "react-router-dom";
import { guestRoutes } from "./guest";
import { authenticatedRoutes } from "./authenticated-routes";
import { organizationRoutes } from "./organization-routes";
import { playgroundRoutes } from "./playground-routes";
import { commonRoutes } from "./common-routes";

export const RootRoutes = () => {
  const activeMode = useAppSelector(
    (state) => state.auth.profileSwitch.activeMode,
  );

  console.log({ activeMode, user: activeMode === "user" });

  if (!activeMode) {
    return (
      <Routes>
        {guestRoutes}
        {playgroundRoutes}
        {commonRoutes}
      </Routes>
    );
  } else if (activeMode === "user") {
    return (
      <Routes>
        {authenticatedRoutes}
        {playgroundRoutes}
        {commonRoutes}
      </Routes>
    );
  } else if (activeMode === "OWNER") {
    return (
      <Routes>
        {organizationRoutes}
        {playgroundRoutes}
        {commonRoutes}
      </Routes>
    );
  } else {
    return (
      <Routes>
        {guestRoutes}
        {playgroundRoutes}
        {commonRoutes}
      </Routes>
    );
  }
};
