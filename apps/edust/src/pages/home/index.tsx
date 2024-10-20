import { useAppSelector } from "@/app/hooks";
import { lazy } from "react";
import { HaveAnOrgAccount } from "@/organizations/components";

export const GuestHome = lazy(() =>
  import("./guest-home").then((module) => ({
    default: module.GuestHome,
  })),
);

export const PrivateHome = lazy(() =>
  import("./private-home").then((module) => ({
    default: module.PrivateHome,
  })),
);

// TODO: need to change it's not work HaveAnOrgAccount
export const Home = () => {
  const auth = useAppSelector((state) => state.auth.authentication);

  return (
    <>
      {auth?.user && <HaveAnOrgAccount auth={auth} />}

      {auth.isAuthenticated ? <PrivateHome /> : <GuestHome />}
    </>
  );
};
