"use client"

import { Button } from "@edust/ui"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@edust/ui"
import { Input } from "@edust/ui"
import { Typography } from "@edust/ui"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const FormSchema = z.object({
  userEmail: z
    .string()
    .email({ message: "Please enter a valid email address." }),
})

export const Newsletter = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      userEmail: "",
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("Form Submitted with data:", data)
  }

  return (
    <section>
      <div className="container py-24 sm:py-32">
        <Typography
          variant="h2"
          className="text-center text-3xl font-bold md:text-4xl"
        >
          Subscribe{" "}
          <span className="from-primary/60 to-primary bg-gradient-to-b bg-clip-text text-transparent">
            to Our Daily Newsletter
          </span>
        </Typography>
        <Typography className="text-muted-foreground mb-8 mt-4 text-center">
          Stay informed and inspired with the latest updates, tips, and stories
          delivered straight to your inbox.
        </Typography>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mx-auto flex w-full flex-col gap-4 md:max-w-[500px] md:flex-row md:gap-2"
          >
            <FormField
              control={form.control}
              name="userEmail"
              render={({ field }) => (
                <FormItem className="mx-auto w-full">
                  <FormControl>
                    <Input
                      placeholder="example@gmail.com"
                      aria-label="Email address"
                      className="bg-muted/50 dark:bg-muted/80"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Subscribe</Button>
          </form>
        </Form>
      </div>
    </section>
  )
}
