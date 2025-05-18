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
import { ImageUp, Trash2 } from "lucide-react"
import Image from "next/image"
import { UseFormReturn } from "react-hook-form"
import type { Path } from "react-hook-form"
import { z } from "zod"

import { useEffect, useState } from "react"

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

interface FormField<TFieldValues> {
  name: Path<TFieldValues>
  label?: string
  description?: string
}

interface ImageUploadFieldProps<TFieldValues extends Record<string, any>> {
  form: UseFormReturn<TFieldValues>
  formField: FormField<TFieldValues>
}

export function ImageUploadField<TFieldValues extends Record<string, any>>({
  form,
  formField,
}: ImageUploadFieldProps<TFieldValues>) {
  const [selectedImage, setSelectedImage] = useState<File | undefined>(
    undefined,
  )
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [inputKey, setInputKey] = useState(Date.now())

  useEffect(() => {
    if (!selectedImage) {
      setPreviewUrl(null)
      return
    }
    const objectUrl = URL.createObjectURL(selectedImage)
    setPreviewUrl(objectUrl)

    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedImage])

  const onDelete = () => {
    setSelectedImage(undefined)
    setPreviewUrl(null)
    form.setValue(formField.name, undefined as any)
    setInputKey(Date.now())
  }

  return (
    <FormField
      control={form.control}
      name={formField.name}
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor={formField.name}>
            {formField.label || "Photo"}
          </FormLabel>
          <FormControl>
            <Button variant="outline" className="w-full" type="button">
              <input
                key={inputKey}
                type="file"
                className="hidden"
                id={formField.name}
                accept="image/*"
                onBlur={field.onBlur}
                name={field.name}
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  field.onChange(e.target.files)
                  setSelectedImage(file)
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") e.preventDefault()
                }}
                ref={field.ref}
              />
              <label
                htmlFor={formField.name}
                className="flex w-full cursor-pointer items-center gap-2"
              >
                <ImageUp size={20} />
                <span className="whitespace-nowrap">
                  {selectedImage
                    ? selectedImage.name
                    : "Choose File No file chosen"}
                </span>
              </label>
            </Button>
          </FormControl>

          {previewUrl && (
            <div className="relative mt-2 max-w-60">
              <Image
                src={previewUrl}
                alt="Preview"
                className="h-full w-full rounded-md object-cover"
                width={100}
                height={100}
              />
              <Button
                type="button"
                onClick={onDelete}
                aria-label="Delete image"
                size={"icon"}
                variant={"ghost"}
                className="absolute right-0 top-0"
              >
                <Trash2 size={16} color="red" />
              </Button>
            </div>
          )}

          {formField.description && (
            <FormDescription>{formField.description}</FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
