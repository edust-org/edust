import { useAppSelector } from "@/app/hooks";
import { Route, Routes } from "react-router-dom";
import { guestRoutes } from "./guest";
import { authenticatedRoutes } from "./authenticated-routes";
import { organizationRoutes } from "./organization-routes";
import { playgroundRoutes } from "./playground-routes";
import { commonRoutes } from "./common-routes";
import { NotFound } from "@/pages";

export const RootRoutes = () => {
  const activeMode = useAppSelector(
    (state) => state.auth.profileSwitch.activeMode,
  );

  if (!activeMode) {
    return (
      <Routes>
        {guestRoutes}
        {playgroundRoutes}
        {commonRoutes}

        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  } else if (activeMode === "user") {
    return (
      <Routes>
        {authenticatedRoutes}
        {playgroundRoutes}
        {commonRoutes}
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  } else if (activeMode === "OWNER") {
    return (
      <Routes>
        {organizationRoutes}
        {playgroundRoutes}
        {commonRoutes}

        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  } else {
    return (
      <Routes>
        {guestRoutes}
        {playgroundRoutes}
        {commonRoutes}

        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  }
};
