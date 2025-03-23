"use client"

import {
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/components/ui"
import axios from "@/lib/axios"
import { Roles } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import imageCompression from "browser-image-compression"
import { ImageUp } from "lucide-react"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useBoolean } from "usehooks-ts"
import { z } from "zod"

import { useEffect, useState } from "react"

const MAX_FILE_SIZE = 1024 * 1024 * 5 // 5mb
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
]
const FormSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(3, { message: "Name must be at least 3 characters long" })
      .refine((value) => /^[A-Za-z\s()-]*$/.test(value), {
        message: "Name must only contain English letters and spaces",
      }),
    orgUsername: z
      .string()
      .trim()
      .min(3, { message: "Username must be at least 3 characters long" })
      .transform((value) => value.toLowerCase())
      .refine((value) => /^[a-z-]*$/.test(value), {
        message: "Username must only contain English letters and hyphens",
      }),
    email: z
      .string()
      .trim()
      .min(3, { message: "required" })
      .email({ message: "Invalid email format" }),
    location: z
      .string()
      .trim()
      .min(10, "Location must be at least 10 characters long"),
    profilePic: z
      .any()
      .refine((file) => !!file, `Photo is required`)
      .refine((file) => {
        return file?.[0]?.size <= MAX_FILE_SIZE
      }, `Max image size is 5MB.`)
      .refine((file) => {
        if (!file) return true // Allow no file
        return ACCEPTED_IMAGE_MIME_TYPES.includes(file?.[0]?.type)
      }, "Only .jpg, .jpeg, .png, and .webp formats are supported."),
  })
  .partial()
  .transform((data) => {
    // Remove any undefined properties from the object
    const cleanedData = Object.fromEntries(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Object.entries(data).filter(([_, value]) => value !== undefined),
    )
    return cleanedData
  })

export default function Profile() {
  const session = useSession()

  const [orgProfileData, setOrgProfileData] = useState(null)
  const isDataSaving = useBoolean(false)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: undefined,
      orgUsername: undefined,
      email: undefined,
      location: undefined,
      profilePic: undefined,
    },
  })
  const [selectedImage, setSelectedImage] = useState<File | undefined>(
    undefined,
  )

  useEffect(() => {
    // TODO: Need to refetch system
    const getOrgMe = async () => {
      const data = await axios.get(`/api/v0/organizations/me`)
      const orgData = data?.data?.data

      setOrgProfileData(orgData)

      form.setValue("name", orgData.name)
      form.setValue("orgUsername", orgData.orgUsername)
      form.setValue("email", orgData.email || undefined)
      form.setValue("location", orgData.location || undefined)
    }
    getOrgMe()
  }, [form])

  const location = form.watch("location")
  const email = form.watch("email")
  const profilePic = form.watch("profilePic")

  useEffect(() => {
    if (!location) {
      form.clearErrors("location")
      form.setValue("location", undefined)
    }
    if (!email) {
      form.clearErrors("email")
      form.setValue("email", undefined)
    }
    if (!profilePic) {
      form.clearErrors("profilePic")
      form.setValue("profilePic", undefined)
    }
  }, [form, location, email, profilePic])

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const uniqueValue: any = {}

    for (const key in data) {
      if (orgProfileData && data[key] !== orgProfileData[key]) {
        uniqueValue[key] = data[key]
      }
    }

    if (Object.keys(uniqueValue).length > 0) {
      isDataSaving.setTrue()

      const formData = new FormData()

      try {
        const profilePic = uniqueValue.profilePic
          ? uniqueValue.profilePic[0]
          : undefined

        if (profilePic) {
          const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
          }

          const compressedImageFile = await imageCompression(
            profilePic,
            options,
          )

          formData.append("profilePic", compressedImageFile, profilePic.name)
        }
      } catch (error) {
        console.error("Profile Pic Compressed ", error)
      }

      // Append fields from data to FormData
      Object.entries(uniqueValue).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          if (key !== "profilePic") {
            formData.append(key, value as string)
          }
        }
      })

      // Update the profile here
      try {
        const response = await axios.patch(
          `/api/v0/organizations/me`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        )

        const org = response?.data?.data

        const organizationRole = session.data?.user.organizationRoles?.find(
          (org) => org.role === Roles.OWNER,
        )
        const organizationRolesFilter =
          session.data?.user.organizationRoles?.filter(
            (org) => org.role !== Roles.OWNER,
          ) || []

        const updatedOrg = {
          ...organizationRole,
          organization: {
            ...organizationRole?.organization,

            name: org.name,
            orgUsername: org.orgUsername,
          },
        }

        session.update({
          organizationRoles: [...organizationRolesFilter, updatedOrg],
        })

        toast.success(response?.data?.message)
      } catch (error) {
        toast.error(error?.response?.data.message)
        console.error("Save Org Profile", error)
      } finally {
        isDataSaving.setFalse()
      }
    }
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto max-w-xl space-y-8 rounded-md p-4 shadow md:p-8"
        >
          {/* Name Field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Name <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Your full name" {...field} />
                </FormControl>
                <FormDescription>
                  This will be your display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Org Username Field */}
          <FormField
            control={form.control}
            name="orgUsername"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Username <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Your username" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Your email" {...field} />
                </FormControl>
                <FormDescription>
                  We'll use this to contact you.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Location Field */}
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="Your location" {...field} />
                </FormControl>
                <FormDescription>This is where you're located.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* profilePic */}
          <FormField
            control={form.control}
            name="profilePic"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Organization Profile</FormLabel>
                <FormControl>
                  <Button variant="outline" className="w-full" type="button">
                    <input
                      type="file"
                      className="hidden w-full"
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
                <FormDescription>
                  Upload a cover photo of the institute.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isDataSaving.value}>
            Update profile
          </Button>
        </form>
      </Form>
    </>
  )
}
