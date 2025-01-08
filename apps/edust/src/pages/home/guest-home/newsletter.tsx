import { Button, Input, Typography } from "@/components/ui"

export const Newsletter = () => {
  const handleSubmit = (e: any) => {
    e.preventDefault()
    console.log("Subscribed!")
  }

  return (
    <section>
      <div className="container py-24 sm:py-32">
        <Typography
          variant="h2"
          className="text-center text-3xl font-bold md:text-4xl"
        >
          Subscribe
          <span className="bg-gradient-to-b from-primary/60 to-primary bg-clip-text text-transparent">
            to Our Daily Newsletter
          </span>
        </Typography>
        <Typography
          affects="small"
          className="mb-8 mt-4 text-center text-muted-foreground"
        >
          Stay informed and inspired with the latest updates, tips, and stories
          delivered straight to your inbox.
        </Typography>

        <form
          className="mx-auto flex w-full flex-col gap-4 md:max-w-[500px] md:flex-row md:gap-2"
          onSubmit={handleSubmit}
        >
          <Input
            placeholder="example@gmail.com"
            className="bg-muted/50 dark:bg-muted/80"
          />
          <Button>Subscribe</Button>
        </form>
      </div>
    </section>
  )
}
