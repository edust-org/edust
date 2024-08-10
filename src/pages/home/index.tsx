import assets from "@/assets/images";
import { Navbar } from "@/components";
import { Button, Typography } from "@/components/ui";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useAppSelector } from "@/app/hooks";
import { lazy } from "react";

const OrgLists = lazy(() =>
  import("./org-lists").then((module) => ({
    default: module.OrgLists,
  }))
);

export const Home = () => {
  const { isAuthenticated } = useAppSelector(
    (state) => state.auth.authentication
  );
  return (
    <>
      <Helmet>
        <title>Edust</title>
      </Helmet>

      <Navbar />

      {!isAuthenticated && (
        <div className="h-screen flex items-center justify-center flex-col gap-4">
          <Typography variant="h1">Welcome to our Edust!</Typography>
          <img src={assets.logo} alt="" />
          <Link to={"/organizations/create"}>
            <Button>Get Started</Button>
          </Link>
        </div>
      )}

      {isAuthenticated && (
        <div className="bg-slate-50 h-screen p-8">
          <OrgLists />
        </div>
      )}
    </>
  );
};
