import { Logo } from "@/assets/images";
import { Navbar } from "@/components";
import { Button, Typography } from "@/components/ui";

export const Home = () => {
  return (
    <>
      <Navbar />
      <div className="h-screen flex items-center justify-center flex-col gap-4">
        <Typography variant="h1">Welcome to our Edust!</Typography>
        <img src={Logo} alt="" />
        <Button>Get Started</Button>
      </div>
    </>
  );
};
