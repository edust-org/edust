import { Button, Typography } from "@/components/ui"
import Link from "next/link"

export const StartDesign = () => {
  return (
    <section className="container">
      <div
        className={`flex min-h-52 flex-col items-center justify-center gap-4 rounded-2xl bg-[url('/images/home/home-guest-start-design.avif')] bg-cover bg-no-repeat p-4 md:py-16 lg:py-28`}
      >
        <Typography variant="h2" className="text-center text-white">
          Start your design transformation with <br />
          custom sites today.
        </Typography>
        <Link href={"/auth/register"}>
          <Button variant={"outline"}>Get Started</Button>
        </Link>
      </div>
    </section>
  )
}
