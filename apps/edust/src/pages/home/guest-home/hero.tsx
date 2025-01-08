import { Button, Typography } from "@/components/ui"
import { cn } from "@/utils"
import { Link } from "react-router"

export const Hero = () => {
  return (
    <div className="relative mt-20 grid items-center justify-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-center gap-6 pb-24">
        <Typography
          variant="h1"
          className="font-pixel z-10 text-center font-bold leading-tight tracking-wider text-accent-foreground"
        >
          Build your own site for your
          <Typography className="z-10 mt-0 underline decoration-gray-400 decoration-4 underline-offset-2 sm:mt-0 md:mt-0 lg:mt-3">
            organizations
          </Typography>
        </Typography>
        <Typography className="z-10 max-w-[700px] text-center text-lg text-accent-foreground sm:text-xl">
          Don’t worry about Domain and Hoisting just build your site and publish
          it.
        </Typography>{" "}
        <Typography
          className="z-10 max-w-[700px] text-center text-accent-foreground"
          affects="removePaddingMargin"
        >
          Discover new features, create organizations, and build customizable
          pages for educational institutions. Join Edust today to revolutionize
          the way we learn and collaborate.
        </Typography>{" "}
        <Link to={"/auth/register"} className="z-10">
          <Button size={"lg"}>Get Started</Button>
        </Link>
      </div>

      <section className="absolute inset-0 z-0 max-w-[1000]">
        <div
          className={cn(
            "pointer-events-none absolute size-full overflow-hidden opacity-50 [perspective:200px]",
          )}
        >
          {/* Grid */}
          <div className="absolute inset-0 [transform:rotateX(35deg)]">
            <div
              className={cn(
                "animate-grid",

                "[background-repeat:repeat] [background-size:60px_60px] [height:300vh] [inset:0%_0px] [margin-left:-50%] [transform-origin:100%_0_0] [width:600vw]",

                // Light Styles
                "[background-image:linear-gradient(to_right,rgba(0,0,0,0.3)_1px,transparent_0),linear-gradient(to_bottom,rgba(0,0,0,0.3)_1px,transparent_0)]",

                // Dark styles
                "dark:[background-image:linear-gradient(to_right,rgba(255,255,255,0.2)_1px,transparent_0),linear-gradient(to_bottom,rgba(255,255,255,0.2)_1px,transparent_0)]",
              )}
            />
          </div>

          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent to-90% dark:from-gray-700" />
        </div>
      </section>
    </div>
  )
}
