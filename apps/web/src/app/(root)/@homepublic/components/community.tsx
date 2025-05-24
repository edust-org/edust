import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@edust/ui"
import { FaDiscord } from "react-icons/fa"

export const Community = () => {
  return (
    <section className="py-12">
      <hr className="border-secondary" />
      <div className="container py-20 sm:py-20">
        <div className="mx-auto lg:w-[60%]">
          <Card className="bg-background flex flex-col items-center justify-center border-none text-center shadow-none">
            <CardHeader>
              <CardTitle className="flex flex-col items-center text-4xl font-bold md:text-4xl">
                <FaDiscord className="text-primary text-7xl" />
                <div>
                  Ready to join the
                  <span className="to-primary bg-gradient-to-r from-slate-500 bg-clip-text pl-2 text-transparent">
                    Community?
                  </span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground text-xl lg:w-[80%]">
              Connect, share, and grow with like-minded enthusiasts in our
              vibrant Discord community. Click below to dive in! 🚀
            </CardContent>

            <CardFooter>
              <Button asChild>
                <a href="https://discord.gg/vnhqmn9mdj" target="_blank">
                  Join Discord
                </a>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      <hr className="border-secondary" />
    </section>
  )
}
