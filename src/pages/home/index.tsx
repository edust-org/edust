import assets from "@/assets/images";
import { Navbar } from "@/components";
import { Button, Typography } from "@/components/ui";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useAppSelector } from "@/app/hooks";
import { lazy } from "react";
import { HaveAnOrgAccount } from "@/organizations/components";
import Hero from "./heor";

const OrgLists = lazy(() =>
  import("./org-lists").then((module) => ({
    default: module.OrgLists,
  })),
);

export const Home = () => {
  const auth = useAppSelector((state) => state.auth.authentication);

  return (
    <>
      <Helmet>
        <title>Edust</title>
      </Helmet>
      {/* TODO: problem here */}
      {auth?.user && <HaveAnOrgAccount auth={auth} />}

      <div className="flex min-h-screen flex-col">
        <Navbar />
        {!auth.isAuthenticated && (
          <>
            <Hero />
          </>
        )}
      </div>

      {auth.isAuthenticated && (
        <div className="h-screen bg-slate-50 p-8">
          <OrgLists />
        </div>
      )}
    </>
  );
};
