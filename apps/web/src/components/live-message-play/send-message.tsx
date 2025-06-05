"use client"

import { Button } from "@edust/ui"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@edust/ui"
import { Input } from "@edust/ui"
import { defaultValues } from "@/configs"
import axios from "@/lib/axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const FormSchema = z.object({
  message: z.string().min(2, {
    message: "message must be at least 2 characters.",
  }),
})

export function SendMessage() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      message: "",
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      await axios.post(
        `${defaultValues.backendURL}/api/v0/playground/live-message`,
        { message: data.message },
      )
    } catch (error) {
      console.error(error)
    }

    // console.log(data)
    // const socket = getSocket()
    // socket.emit("message", data.message)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-lg space-y-6"
      >
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>message</FormLabel>
              <FormControl>
                <Input placeholder="message" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
