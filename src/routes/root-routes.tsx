import { useAppSelector } from "@/app/hooks";
import { Route, Routes } from "react-router-dom";
import { guestRoutes } from "./guest";
import { authenticatedRoutes } from "./authenticated-routes";
import { organizationRoutes } from "./organization-routes";
import { playgroundRoutes } from "./playground-routes";
import { commonRoutes } from "./common-routes";
import { NotFound } from "@/pages";
import { Roles } from "@/types";

export const RootRoutes = () => {
  const activeMode = useAppSelector(
    (state) => state.auth.profileSwitch.activeMode,
  );

  if (activeMode === Roles.GUEST) {
    return (
      <Routes>
        {guestRoutes}
        {playgroundRoutes}
        {commonRoutes}
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  }

  if (activeMode === "USER") {
    return (
      <Routes>
        {authenticatedRoutes}
        {playgroundRoutes}
        {commonRoutes}
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  }

  if (typeof activeMode === "object" && activeMode !== null) {
    if (activeMode.role) {
      return (
        <Routes>
          {organizationRoutes}
          {playgroundRoutes}
          {commonRoutes}

          <Route path="*" element={<NotFound />} />
        </Routes>
      );
    }
  }
};
