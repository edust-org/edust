import { Button, Typography } from "@/components/ui";
import { FaRegArrowAltCircleRight } from "react-icons/fa";

export const HelpGetStarted = () => {
  return (
    <section className="relative overflow-hidden bg-white py-4 md:py-8 lg:py-28">
      <div className="container">
        <Typography variant="h1" className="relative z-10 mb-8 text-center">
          We'll help you get started
        </Typography>
        <div>
          <div className="relative z-10 mx-auto grid max-w-[900px] items-center gap-4 rounded-t-2xl border border-white bg-gradient-to-r from-white from-15% p-4 backdrop-blur-lg md:grid-cols-[auto_224px]">
            <div className="flex items-center gap-4">
              <div>
                <Button className="h-10 w-10 animate-bounce rounded-full p-1.5">
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
            <div className="min-h-24 p-2 md:max-w-56">
              <img
                src="https://dummyimage.com/200x100/000/fff"
                alt=""
                className="w-full rounded-lg md:max-w-56"
              />
            </div>
          </div>
          <div className="relative z-10 mx-auto grid max-w-[900px] items-center gap-4 border border-white bg-gradient-to-r from-white from-15% p-4 backdrop-blur-lg md:grid-cols-[auto_224px]">
            <div className="flex items-center gap-4">
              <div>
                <Button className="h-10 w-10 animate-bounce rounded-full p-1.5">
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
            <div className="min-h-24 p-2 md:max-w-56">
              <img
                src="https://dummyimage.com/200x100/000/fff"
                alt=""
                className="w-full rounded-lg md:max-w-56"
              />
            </div>
          </div>
          <div className="relative z-10 mx-auto grid max-w-[900px] items-center gap-4 rounded-b-2xl border border-white bg-gradient-to-r from-white from-15% p-4 backdrop-blur-lg md:grid-cols-[auto_224px]">
            <div className="flex items-center gap-4">
              <div>
                <Button className="h-10 w-10 animate-bounce rounded-full p-1.5">
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
            <div className="min-h-24 p-2 md:max-w-56">
              <img
                src="https://dummyimage.com/200x100/000/fff"
                alt=""
                className="w-full rounded-lg md:max-w-56"
              />
            </div>
          </div>
        </div>
        <svg
          className="absolute bottom-0 right-0 top-0 rotate-90 rounded-full"
          viewBox="0 0 1115 1115"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_f_382_1678)">
            <path
              d="M853 557.5C853 720.7 720.7 853 557.5 853C394.3 853 262 720.7 262 557.5C262 394.3 394.3 262 557.5 262C720.7 262 853 394.3 853 557.5Z"
              fill="url(#paint0_linear_382_1678)"
            />
          </g>
          <defs>
            <filter
              id="filter0_f_382_1678"
              x="0.495575"
              y="0.495575"
              width="1114.01"
              height="1114.01"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="130.752"
                result="effect1_foregroundBlur_382_1678"
              />
            </filter>
            <linearGradient
              id="paint0_linear_382_1678"
              x1="558.372"
              y1="97.2522"
              x2="557.5"
              y2="853"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#0F172A" stopOpacity="0" />
              <stop offset="1" stopColor="#111827" stopOpacity="0.45" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
};
