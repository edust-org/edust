import assets from "@/assets/images";
import { Navbar } from "@/components";
import { Button, Typography } from "@/components/ui";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <>
      <Helmet>
        <title>Edust</title>
      </Helmet>

      <Navbar />
      <div className="h-screen flex items-center justify-center flex-col gap-4">
        <Typography variant="h1">Welcome to our Edust!</Typography>
        <img src={assets.logo} alt="" />
        <Link to={"/organizations/create"}>
          <Button>Get Started</Button>
        </Link>
      </div>
    </>
  );
};
