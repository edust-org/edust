'use client'
import { Button, Input, Label, Textarea, Typography } from "@/components/ui"
import { defaultValues } from "@/configs"
import { useForm, ValidationError } from "@formspree/react"
import Link from "next/link"
import { toast } from "sonner"


export function ContactFormSpree() {
  const [state, handleSubmit] = useForm(defaultValues.formSpreedID)

  if (state.succeeded) {
    toast.success("Your messages have been sent successfully!")
    return (
      <div className="text-center ">
        <Typography variant="h3" className="mb-3">
          Thanks for joining!
        </Typography>
        <Link href={"/"}>
          <Button variant={"outline"}>Back to home</Button>
        </Link>
      </div>
    )
  }
  return (
    <>
    <h2 className="text-2xl font-semibold text-black pb-6">Got any question about your problems?</h2>
    <form onSubmit={handleSubmit} className="w-full space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          type="text"
          name="name"
          placeholder="Enter your full name"
          required
        />
        <ValidationError prefix="Name" field="name" errors={state.errors} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          name="email"
          placeholder="Enter your email"
          required
        />
        <ValidationError prefix="Email" field="email" errors={state.errors} />
      </div>
      <div>
        <Textarea
          id="message"
          name="message"
          placeholder="Tell us a little bit about yourself"
          required
        />
        <ValidationError
          prefix="Message"
          field="message"
          errors={state.errors}
        />
      </div>
      <Button type="submit" disabled={state.submitting} className="w-full">
        Send your message
      </Button>
    </form>
    </>
  )
}


