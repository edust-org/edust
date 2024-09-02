import { Button, Typography } from "@/components/ui";
import { FaRegArrowAltCircleRight } from "react-icons/fa";

export const HelpGetStarted = () => {
  return (
    <section className="container">
      <Typography variant="h1" className="mb-8 text-center">
        We'll help you get started
      </Typography>

      <div>
        <div className="mx-auto grid max-w-[900px] items-center gap-4 rounded-t-2xl border bg-slate-50 p-4 md:grid-cols-[auto_224px]">
          <div className="flex items-center gap-4">
            <div>
              <Button
                variant={"outline"}
                className="h-14 w-14 rounded-full p-3"
              >
                <FaRegArrowAltCircleRight className="text-4xl" />
              </Button>
            </div>
            <div>
              <Typography variant="h3">Start with a template</Typography>
              <Typography variant="p" className="[&:not(:first-child)]:mt-0">
                Explore 400+ customizable templates for your use case
              </Typography>
            </div>
          </div>
          <div className="p-2 md:max-w-56">
            <img
              src="https://www.glideapps.com/_next/image?url=%2Fimages%2Fhomepage-2024%2Fresources%2Fsales-dashboard-template.jpg&w=1920&q=75"
              alt=""
              className="w-full rounded-lg md:max-w-56"
            />
          </div>
        </div>
        <div className="mx-auto grid max-w-[900px] items-center gap-4 border bg-slate-50 p-4 md:grid-cols-[auto_224px]">
          <div className="flex items-center gap-4">
            <div>
              <Button
                variant={"outline"}
                className="h-14 w-14 rounded-full p-3"
              >
                <FaRegArrowAltCircleRight className="text-4xl" />
              </Button>
            </div>
            <div>
              <Typography variant="h3">What is No Code?</Typography>
              <Typography variant="p" className="[&:not(:first-child)]:mt-0">
                Learn how no code is changing the way we build software
              </Typography>
            </div>
          </div>
          <div className="p-2 md:max-w-56">
            <img
              src="https://www.glideapps.com/_next/image?url=%2Fimages%2Fhomepage-2024%2Fresources%2Fwhat-is-no-code.jpg&w=1920&q=75"
              alt=""
              className="w-full rounded-lg md:max-w-56"
            />
          </div>
        </div>
        <div className="mx-auto grid max-w-[900px] items-center gap-4 rounded-b-2xl border bg-slate-50 p-4 md:grid-cols-[auto_224px]">
          <div className="flex items-center gap-4">
            <div>
              <Button
                variant={"outline"}
                className="h-14 w-14 rounded-full p-3"
              >
                <FaRegArrowAltCircleRight className="text-4xl" />
              </Button>
            </div>
            <div>
              <Typography variant="h3">Glide Expert</Typography>
              <Typography variant="p" className="[&:not(:first-child)]:mt-0">
                Find an Expert from our community to help build your app
              </Typography>
            </div>
          </div>
          <div className="p-2 md:max-w-56">
            <img
              src="https://www.glideapps.com/_next/image?url=%2Fimages%2Fhomepage-2024%2Fresources%2Fhire-a-glide-expert.jpg&w=1920&q=75"
              alt=""
              className="w-full rounded-lg md:max-w-56"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
