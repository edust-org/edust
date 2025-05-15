"use client"

import { ImageUploadField, imageUploadFieldZod } from "@/components"
import { LiveMessagePlay } from "@/components/live-message-play"
import { Button, Typography } from "@/components/ui"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { cloudinary } from "@/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  photo: imageUploadFieldZod,
})

export default function Playground() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "examle",
      photo: undefined,
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const image = data.photo[0]

    try {
      const uploadResult = await cloudinary.uploadImage(image, {
        folderPrefixes: "test1",
      })
      console.log(uploadResult)
    } catch (error) {
      console.error("Upload failed:", error)
    }
  }

  return (
    <>
      <Typography variant="h2">Playground</Typography>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <ImageUploadField form={form} formField={{ name: "photo" }} />
          <Button type="submit">Submit</Button>
        </form>
      </Form>

      <LiveMessagePlay />
    </>
  )
}
