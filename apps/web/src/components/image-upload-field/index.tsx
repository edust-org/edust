"use client"

import {
  Button,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui"
import { ImageUp } from "lucide-react"
import { UseFormReturn } from "react-hook-form"
import { z } from "zod"

import { useState } from "react"

const MAX_FILE_SIZE = 1024 * 1024 * 2 // 2mb

const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
]

export const imageUploadFieldZod = z
  .any()
  .refine((file) => !!file, `Photo is required`)
  .refine((file) => {
    return file?.[0]?.size <= MAX_FILE_SIZE
  }, `Max image size is 2MB.`)
  .refine((file) => {
    if (!file) return true // Allow no file
    return ACCEPTED_IMAGE_MIME_TYPES.includes(file?.[0]?.type)
  }, "Only .jpg, .jpeg, .png, and .webp formats are supported.")

interface ImageUploadFieldProps {
  form: UseFormReturn<
    {
      [k: string]: unknown
    },
    unknown,
    undefined
  >

  formField: {
    name: string
    label?: string
    description?: string
  }
}

export const ImageUploadField = ({
  form,
  formField,
}: ImageUploadFieldProps) => {
  const [selectedImage, setSelectedImage] = useState<File | undefined>(
    undefined,
  )
  return (
    <FormField
      control={form.control}
      name={formField.name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{formField.label || "Photo"}</FormLabel>
          <FormControl>
            <Button variant="outline" className="w-full" type="button">
              <input
                type="file"
                className="hidden"
                id="fileInput"
                accept="image/*"
                onBlur={field.onBlur}
                name={field.name}
                onChange={(e) => {
                  field.onChange(e.target.files)
                  setSelectedImage(e.target.files?.[0])
                }}
                ref={field.ref}
              />
              <label
                htmlFor="fileInput"
                className="flex w-full items-center gap-2"
              >
                <ImageUp size={20} />
                <span className="whitespace-nowrap">
                  {selectedImage
                    ? `${selectedImage.name}`
                    : "Choose File No file chosen"}
                </span>
              </label>
            </Button>
          </FormControl>

          {formField.description && (
            <FormDescription>{formField.description}</FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
