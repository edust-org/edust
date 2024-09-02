import { useAppSelector } from "@/app/hooks";
import { lazy } from "react";
import { HaveAnOrgAccount } from "@/organizations/components";

const OrgLists = lazy(() =>
  import("./org-lists").then((module) => ({
    default: module.OrgLists,
  })),
);

const GuestHome = lazy(() =>
  import("././guest-home").then((module) => ({
    default: module.GuestHome,
  })),
);

export const Home = () => {
  const auth = useAppSelector((state) => state.auth.authentication);

  return (
    <>
      {auth?.user && <HaveAnOrgAccount auth={auth} />}

      {auth.isAuthenticated ? (
        <div className="h-screen bg-slate-50 p-8">
          <OrgLists />
        </div>
      ) : (
        <GuestHome />
      )}
    </>
  );
};
