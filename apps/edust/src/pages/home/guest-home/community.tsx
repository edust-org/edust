import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui"
import { defaultValues } from "@/configs"
import { FaDiscord } from "react-icons/fa"

export const Community = () => {
  return (
    <section className="py-12">
      <hr className="border-secondary" />
      <div className="container py-20 sm:py-20">
        <div className="mx-auto lg:w-[60%]">
          <Card className="flex flex-col items-center justify-center border-none bg-background text-center shadow-none">
            <CardHeader>
              <CardTitle className="flex flex-col items-center text-4xl font-bold md:text-4xl">
                <FaDiscord className="text-7xl text-primary" />
                <div>
                  Ready to join the
                  <span className="bg-gradient-to-r from-slate-500 to-primary bg-clip-text pl-2 text-transparent">
                    Community?
                  </span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-xl text-muted-foreground lg:w-[80%]">
              Connect, share, and grow with like-minded enthusiasts in our
              vibrant Discord community. Click below to dive in! 🚀
            </CardContent>

            <CardFooter>
              <Button asChild>
                <a href={defaultValues.discordLink} target="_blank">
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
