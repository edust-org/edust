import { ticketHooks } from "@/hooks/react-query"
import { CloudinaryUploadResponse } from "@/types"
import { cloudinary, cn } from "@/utils"
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Input,
  Textarea,
} from "@edust/ui"
import { zodResolver } from "@hookform/resolvers/zod"
import { ImageUp, X } from "lucide-react"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { useState } from "react"

import { useMessagesStore } from "../messages-store"

const FormSchema = z.object({
  message: z.string().min(1, {
    message: "Message is required!",
  }),
  imageFiles: z.any(),
})

interface ChatBoxProps {
  ticketId: string
}

export const ChatBox: React.FC<ChatBoxProps> = ({ ticketId }) => {
  const { addMessage } = useMessagesStore()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      message: "",
      imageFiles: undefined,
    },
  })

  const [isUploading, setIsUploading] = useState(false)
  const [previewUrls, setPreviewUrls] = useState<string[]>([])

  const postNewMessage = ticketHooks.usePostMessage()

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const imageFiles = data.imageFiles

    let uploadedImages: CloudinaryUploadResponse[] = []

    if (imageFiles && imageFiles.length > 0) {
      setIsUploading(true)
      try {
        const uploadPromises = imageFiles.map((file: File) =>
          cloudinary.uploadImage(file, "support"),
        )

        uploadedImages = await Promise.all(uploadPromises)
      } catch (error) {
        console.error(error)
        return
      } finally {
        setIsUploading(false)
      }
    }

    const imageUrls = uploadedImages.map((img) => img.secure_url)

    try {
      const response = await postNewMessage.mutateAsync({
        ticketId,
        body: {
          message: data.message,
          ...(imageUrls ? { imageUrls } : {}),
          ...(uploadedImages ? { imageDetails: uploadedImages } : {}),
        },
      })

      if (response.status === "SUCCESS") {
        form.reset()
        setPreviewUrls([])
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="relative">
          <div className="absolute left-1 top-1 flex flex-wrap gap-2">
            {previewUrls.map((url, index) => (
              <div key={url} className="relative w-fit">
                <Image
                  src={url}
                  className="max-h-[70px] max-w-[100px] rounded object-cover"
                  alt={"preview image"}
                  height={70}
                  width={100}
                />
                <Button
                  variant={"destructive"}
                  className="absolute right-0 top-0 size-5"
                  type="button"
                  onClick={() => {
                    // remove image both form files and previews
                    setPreviewUrls((prev) => prev.filter((_, i) => i !== index))

                    const newFiles =
                      form
                        .watch("imageFiles")
                        ?.filter((_: unknown, i: number) => i !== index) || []
                    form.setValue("imageFiles", newFiles)
                  }}
                >
                  <X />
                </Button>
              </div>
            ))}
          </div>

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="min-h-28">
                <FormControl>
                  <Textarea
                    autoComplete="off"
                    placeholder="Tell us your problems"
                    className={cn(
                      "resize-none",
                      previewUrls.length > 0 && "pt-20",
                    )}
                    {...field}
                  />
                </FormControl>
                {/* <FormMessage /> */}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="imageFiles"
            render={({ field }) => (
              <FormItem className="absolute bottom-1 right-20 mb-2">
                <FormLabel>
                  <ImageUp />
                </FormLabel>
                <FormControl>
                  <Input
                    hidden
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => {
                      const newFiles = Array.from(e.target.files || [])
                      const existingFiles = Array.from(field.value || [])

                      const allFiles = [...existingFiles, ...newFiles]
                      field.onChange(allFiles)

                      const newPreviews = newFiles.map((file) =>
                        URL.createObjectURL(file),
                      )
                      setPreviewUrls((prev) => [...prev, ...newPreviews])
                    }}
                    placeholder="Tell us your problems"
                    className="resize-none"
                  />
                </FormControl>
                {/* <FormMessage /> */}
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="absolute bottom-2 right-2"
            disabled={postNewMessage.isPending || isUploading}
          >
            Send
          </Button>
        </form>
      </Form>
    </div>
  )
}
