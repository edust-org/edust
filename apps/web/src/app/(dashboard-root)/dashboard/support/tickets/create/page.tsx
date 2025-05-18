"use client"

import { ImageUploadField, imageUploadFieldZod } from "@/components"
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/components/ui"
import { ticketHooks } from "@/hooks/react-query"
import { CloudinaryUploadResponse } from "@/types"
import { cloudinary } from "@/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

const FormSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required.",
  }),
  message: z.string().min(1, {
    message: "Message is required.",
  }),
  imageFile: imageUploadFieldZod.optional(),
})

export default function Create() {
  const router = useRouter()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      message: "",
      imageFile: undefined,
    },
  })

  const createNewTicket = ticketHooks.usePostTicket()

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const imageFile = data.imageFile?.[0]

    let imageUrl = ""
    let imageDetails: CloudinaryUploadResponse | null = null

    if (imageFile) {
      try {
        imageDetails = await cloudinary.uploadImage(imageFile, "support")

        imageUrl = imageDetails.secure_url
      } catch (error) {
        console.error(error)
        return
      }
    }

    const payload = {
      title: data.title,
      message: data.message,
      ...(imageUrl ? { imageUrls: [imageUrl] } : {}),
      ...(imageDetails ? { imageDetails: [imageDetails] } : {}),
    }

    try {
      const response = await createNewTicket.mutateAsync(payload)

      if (response.status == "SUCCESS") {
        router.push("/dashboard/support")
        toast.success(response.message)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Card className="mx-auto max-w-lg">
        <CardHeader>
          <CardTitle>Create a new ticket</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Title <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Message <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Optional message" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <ImageUploadField form={form} formField={{ name: "imageFile" }} />

              <Button type="submit">Create now</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  )
}
