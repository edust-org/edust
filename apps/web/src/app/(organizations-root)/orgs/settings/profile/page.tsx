"use client"

import { ImageUploadField, imageUploadFieldZod } from "@/components"
import axios from "@/lib/axios"
import { Roles } from "@/types"
import { asOptionalField } from "@/utils"
import {
  Button,
  Card,
  CardContent,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@edust/ui"
import { zodResolver } from "@hookform/resolvers/zod"
import imageCompression from "browser-image-compression"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useBoolean } from "usehooks-ts"
import { z } from "zod"

import { useEffect, useState } from "react"

interface Role {
  id: string
  name: string
  description: string
}

interface Site {
  id: string
  pages: number
  images: number
}

interface Organization {
  id: string
  name: string
  orgUsername: string
  profilePic: string | null
  email: string | null
  location: string | null
  createdAt: Date
  updatedAt: Date
  role: Role
  site: Site | null
}

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
    email: asOptionalField(
      z
        .string()
        .trim()
        .min(3, { message: "required" })
        .email({ message: "Invalid email format" }),
    ),

    location: asOptionalField(
      z.string().trim().min(10, "Location must be at least 10 characters long"),
    ),

    profilePic: asOptionalField(imageUploadFieldZod),
  })
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

  const [orgProfileData, setOrgProfileData] = useState<Organization | null>(
    null,
  )
  const isDataSaving = useBoolean(false)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      orgUsername: "",
      email: "",
      location: "",
      profilePic: undefined,
    },
  })

  useEffect(() => {
    // TODO: Need to refetch system
    const getOrgMe = async () => {
      const data = await axios.get(`/api/v0/orgs/me`)
      const orgData = data?.data?.data

      setOrgProfileData(orgData as Organization)

      form.setValue("name", orgData.name)
      form.setValue("orgUsername", orgData.orgUsername)
      form.setValue("email", orgData.email || "")
      form.setValue("location", orgData.location || "")
    }
    getOrgMe()
  }, [form])

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
          `/api/v0/orgs/me`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        )

        const org = response?.data?.data as Organization

        const organizationRole = session.data?.user.organizationRoles?.find(
          (org) => org.role === Roles.owner,
        )
        const organizationRolesFilter =
          session.data?.user.organizationRoles?.filter(
            (org) => org.role !== Roles.owner,
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

        if (orgProfileData) {
          setOrgProfileData({
            ...orgProfileData,
            name: org.name,
            orgUsername: org.orgUsername,
            location: org.location,
            profilePic: org.profilePic,
          })
        }
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
      <title>Organizations Profile | Settings</title>
      <Card className="mx-auto max-w-xl">
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                    <FormDescription>
                      This is where you're located.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* profilePic */}

              {orgProfileData?.profilePic && (
                <div>
                  <Image
                    src={orgProfileData?.profilePic}
                    alt={orgProfileData.name}
                    width={1280}
                    height={720}
                    className="rounded"
                  />
                </div>
              )}

              <ImageUploadField
                form={form}
                formField={{
                  name: "profilePic",
                  label: "Organization Profile",
                  description: "Upload a photo of the organization",
                }}
              />

              <Button type="submit" disabled={isDataSaving.value}>
                Update profile
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  )
}
