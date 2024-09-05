import animation from "@/assets/animations/home/edust-hero.json";
import { Button, Typography } from "@/components/ui";
import { Player } from "@lottiefiles/react-lottie-player";
import { FC } from "react";

const Hero: FC = () => {
  return (
    <div className="container relative -z-10 -mt-28 flex h-full w-full flex-col-reverse items-center justify-center gap-5 overflow-hidden pb-5 pt-28 lg:mt-12 lg:flex-row lg:justify-between lg:overflow-visible lg:py-5">
      <div>
        <Typography variant="h1" style={{ lineHeight: "4rem" }}>
          Explore the Future
          <br />
          of Education with
          <br />
          <span className="bg-gradient-to-r from-slate-950 to-slate-400 bg-clip-text text-transparent">
            Edust!
          </span>
        </Typography>

        <Typography
          variant="p"
          className="text-lg font-light text-slate-950 md:text-xl"
        >
          Don’t worry about <span className="font-bold">Domain</span> and{" "}
          <span className="font-bold">Hoisting</span> just build your site{" "}
          <br />
          and publish it.
        </Typography>

        <Typography variant="p" className="text-slate-800 md:text-lg">
          Discover new features, create organizations, and build customizable
          <br />
          pages for{" "}
          <span className="font-semibold">educational institutions</span>. Join
          Edust today to revolutionize <br />
          the way we learn and collaborate.
        </Typography>

        <Button className="mt-5">Get Started - it’s free</Button>
      </div>

      <Player
        autoplay
        loop
        src={animation}
        className="md:w-[400px] xl:w-[600px]"
      />

      <div className="absolute bottom-0 left-40 -z-10 h-[1000px] w-[183px] rotate-45 rounded-b-full bg-gradient-to-b from-slate-400 to-slate-300 blur-[100px]" />
      <div className="absolute -top-[400px] left-[70%] -z-10 h-[700px] w-[183px] rotate-45 rounded-b-full bg-gradient-to-b from-slate-400 to-slate-300 blur-[100px]" />
    </div>
  );
};

export default Hero;
