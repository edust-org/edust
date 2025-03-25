"use client"

import { ImageUploadField, imageUploadFieldZod } from "@/components"
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui"
import { DatePicker } from "@/components/ui/manual"
import axios from "@/lib/axios"
import { Gender, Roles } from "@/types"
import { asOptionalField } from "@/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import imageCompression from "browser-image-compression"
import { isEqual } from "date-fns"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useBoolean } from "usehooks-ts"
import { z } from "zod"

import { useEffect, useState } from "react"

const FormSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(3, { message: "Name must be at least 3 characters long" })
      .refine((value) => /^[A-Za-z\s]*$/.test(value), {
        message: "Name must only contain English letters and spaces",
      }),
    username: asOptionalField(
      z
        .string()
        .trim()
        .min(3, { message: "Username must be at least 3 characters long" })
        .transform((value) => value.toLowerCase())
        .refine((value) => /^[a-z-]*$/.test(value), {
          message: "Username must only contain English letters and hyphens",
        }),
    ),
    emailSecondary: asOptionalField(
      z
        .string()
        .trim()
        .min(3, { message: "required" })
        .email({ message: "Invalid email format" }),
    ),
    gender: asOptionalField(
      z.enum([Gender.male, Gender.female, Gender.others], {
        message: "Invalid gender. Please select 'MALE', 'FEMALE', or 'OTHERS'.",
      }),
    ),
    dateOfBirth: asOptionalField(
      z.preprocess(
        (arg) => (typeof arg === "string" ? new Date(arg) : arg),
        z
          .date()
          .refine(
            (date) => !isNaN(date.getTime()),
            "Invalid date format for dateOfBirth",
          ),
      ),
    ),
    phoneNumber: asOptionalField(
      z.string().regex(/^\+?[0-9]\d{1,14}$/, "Invalid phone number format"),
    ),
    phoneNumberSecondary: asOptionalField(
      z.string().regex(/^\+?[0-9]\d{1,14}$/, "Invalid phone number format"),
    ),
    homeAddress: asOptionalField(
      z.string().min(10, "Address must be at least 10 characters long"),
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

  const [profileData, setProfileData] = useState(null)
  const isDataSaving = useBoolean(false)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      username: "",
      emailSecondary: "",
      gender: "",
      dateOfBirth: undefined,
      phoneNumber: "",
      phoneNumberSecondary: "",
      homeAddress: "",
      profilePic: undefined,
    },
  })

  useEffect(() => {
    // TODO: Need to refetch system
    const getProfileMe = async () => {
      const data = await axios.get(`/api/v0/profile/me`)
      const userData = data?.data?.data

      setProfileData(userData)

      form.setValue("name", userData.name)
      form.setValue("username", userData.username || "")
      form.setValue("emailSecondary", userData.emailSecondary || "")
      form.setValue("gender", userData.gender || "")
      form.setValue(
        "dateOfBirth",
        userData.dateOfBirth ? new Date(userData.dateOfBirth) : undefined,
      )
      form.setValue("phoneNumber", userData.phoneNumber || "")
      form.setValue("phoneNumberSecondary", userData.phoneNumberSecondary || "")
      form.setValue("homeAddress", userData.homeAddress || "")
    }
    getProfileMe()
  }, [form])

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const uniqueValue: any = {}

    for (const key in data) {
      if (profileData && data[key] !== profileData[key]) {
        if (
          key === "dateOfBirth" &&
          !isEqual(new Date(data[key]), new Date(profileData[key]))
        ) {
          uniqueValue[key] = data[key]
        } else {
          if (key !== "dateOfBirth") {
            uniqueValue[key] = data[key]
          }
        }
      }
    }
    console.log(uniqueValue)
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
        const response = await axios.patch(`/api/v0/profile/me`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })

        const user = response?.data?.data
        console.log(user)
        session.update({
          ...session.data?.user,
          profilePic: user.profilePic,
        })

        setProfileData({
          ...profileData,
          name: user.name,
          username: user.username,
          emailSecondary: user.emailSecondary,
          gender: user.gender,
          dateOfBirth: user.dateOfBirth,
          phoneNumber: user.phoneNumber,
          phoneNumberSecondary: user.phoneNumberSecondary,
          homeAddress: user.homeAddress,
          profilePic: user.profilePic,
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
      <title>Profile | Settings</title>
      <div className="mx-auto max-w-xl">
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
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
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

            {/* Email Secondary Field */}
            <FormField
              control={form.control}
              name="emailSecondary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Secondary</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Your secondary email"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    We'll use this to contact you.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Gender Field */}
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a verified email to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={Gender.male}>{Gender.male}</SelectItem>
                      <SelectItem value={Gender.female}>
                        {Gender.female}
                      </SelectItem>
                      <SelectItem value={Gender.others}>
                        {Gender.others}
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  <FormDescription>This is your gender.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Date of Birth Field */}
            {/* <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Birth</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      placeholder="Your date of birth"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>This is your date of birth.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>
                    Date of founded
                    <span className="text-destructive">*</span>
                  </FormLabel>
                  <DatePicker
                    date={field.value}
                    setDate={field.onChange}
                    field={field}
                  />
                  <FormDescription>
                    Provide the date the institute was founded (e.g.,
                    "1990-05-15").
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone Number Field */}
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Your phone number" {...field} />
                  </FormControl>
                  <FormDescription>This is your phone number.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone Number Secondary Field */}
            <FormField
              control={form.control}
              name="phoneNumberSecondary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number Secondary</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your secondary phone number"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is your secondary phone number.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Home Address Field */}
            <FormField
              control={form.control}
              name="homeAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Home Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Your home address" {...field} />
                  </FormControl>
                  <FormDescription>This is your home address.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* profilePic */}
            <ImageUploadField
              form={form}
              formField={{
                name: "profilePic",
                label: "Profile",
                description: "Upload your profile photo",
              }}
            />

            {profileData?.profilePic && (
              <div>
                <Image
                  src={profileData?.profilePic}
                  alt={profileData.name}
                  width={200}
                  height={200}
                  className="rounded"
                />
              </div>
            )}

            <Button type="submit" disabled={isDataSaving.value}>
              Update profile
            </Button>
          </form>
        </Form>
      </div>
    </>
  )
}
