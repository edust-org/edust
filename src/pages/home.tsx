import { useAppSelector } from "@/app/hooks";
import { Logo } from "@/assets/images";
import { Navbar } from "@/components";
import { Button, Typography } from "@/components/ui";
import { HaveOrganization } from "@/organizations/components";
import { Helmet } from "react-helmet-async";

export const Home = () => {
  const profile = useAppSelector((state) => state.auth);
  console.log(profile);
  return (
    <>
      <Helmet>
        <title>Edust</title>
      </Helmet>
      <HaveOrganization />

      <Navbar />
      <div className="h-screen flex items-center justify-center flex-col gap-4">
        <Typography variant="h1">Welcome to our Edust!</Typography>
        <img src={Logo} alt="" />
        <Button>Get Started</Button>
      </div>
    </>
  );
};
