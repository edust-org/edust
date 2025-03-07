"use client"

import { Loading } from "@/components"
import {
  Button,
  Card,
  CardContent,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Textarea,
} from "@/components/ui"
import { DatePicker } from "@/components/ui/manual/date-picker"
import {
  useGetMeInstitutesListsQuery,
  usePostInstituteMutation,
} from "@/lib/store/api/v0/institutes"
import { Status } from "@/types"
import { cn, convertSlug } from "@/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import imageCompression from "browser-image-compression"
import { Check, ChevronsUpDown, ImageUp } from "lucide-react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { BarLoader } from "react-spinners"
import { toast } from "sonner"
import { z } from "zod"

import { Suspense, lazy, useEffect, useState } from "react"

import { CategoriesField } from "./components/categories-field"
import { DistrictField } from "./components/district-field"
import { DivisionField } from "./components/division-field"
import { SubDistrictField } from "./components/sub-district-field"

// const Editor = lazy(() => import("./editor"))

const MAX_FILE_SIZE = 1024 * 1024 * 5 // 5mb
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
]
const FormSchema = z.object({
  instituteCategoryId: z
    .string({
      required_error: "Please select a category.",
    })
    .min(1, "category is required"),
  name: z
    .string()
    .min(1, "Name is required")
    .refine((value) => /^[A-Za-z\s()\-,]*$/.test(value), {
      message: "Name must only contain English letters and spaces",
    }),
  slug: z.string().min(1, "Slug is required"),
  codeType: z.string().trim().min(1, { message: "codeType required" }),
  code: z.string().min(1, "code is required"),
  photo: z
    .any()
    .refine((file) => !!file, `Photo is required`)
    .refine((file) => {
      return file?.[0]?.size <= MAX_FILE_SIZE
    }, `Max image size is 5MB.`)
    .refine((file) => {
      if (!file) return true // Allow no file
      return ACCEPTED_IMAGE_MIME_TYPES.includes(file?.[0]?.type)
    }, "Only .jpg, .jpeg, .png, and .webp formats are supported."),

  language: z.string().trim().min(1, { message: "required" }),
  foundedDate: z.preprocess(
    (arg) => (typeof arg === "string" ? new Date(arg) : arg),
    z.date(),
  ),

  phoneNumber: z
    .string()
    .trim()
    .min(1, { message: "required" })
    .regex(/^[+]?[0-9\s\-()]*$/, {
      message: "Invalid phone number format",
    }),
  contactEmail: z
    .string()
    .trim()
    .min(1, { message: "required" })
    .email({ message: "Invalid email format" }),
  website: z.string().trim().optional(),
  principalName: z.string().trim().min(1, { message: "required" }),

  country: z.string().trim().min(1, { message: "required" }),
  division: z.string().trim().min(1, { message: "required" }),
  district: z.string().trim().min(1, { message: "required" }),
  subDivision: z.string().trim().optional(),
  subDistrict: z.string().trim().min(1, { message: "required" }),
  addressLine1: z.string().trim().min(1, { message: "required" }),
  addressLine2: z.string().trim().optional(),
  postalCode: z.string().trim().min(1, { message: "required" }),
  latitude: z.coerce
    .number()
    .min(-90)
    .max(90)
    .refine((value) => value !== 0, {
      message: "Latitude cannot be 0",
    }),
  longitude: z.coerce
    .number()
    .min(-180)
    .max(180)
    .refine((value) => value !== 0, {
      message: "Longitude cannot be 0",
    }),
  overview: z.string().trim().optional(),
})

export default function Create() {
  const router = useRouter()

  const { refetch } = useGetMeInstitutesListsQuery()
  // TODO: get lat long
  // const g= navigator.geolocation
  // g.getCurrentPosition((p)=>console.log(p))

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      instituteCategoryId: "",
      name: "",
      slug: "",
      codeType: "",
      code: "",
      photo: undefined,
      language: "",
      foundedDate: undefined,
      phoneNumber: "",
      contactEmail: "",
      website: "",
      principalName: "",
      country: "Bangladesh",
      division: "",
      district: "",
      subDivision: undefined,
      subDistrict: "",
      addressLine1: "",
      addressLine2: undefined,
      postalCode: "",
      latitude: 0,
      longitude: 0,
      overview: undefined,
    },
  })

  const codeType = [{ label: "EIIN", value: "EIIN" }]
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const languages = [
    { label: "Bengali", value: "Bengali" },
    { label: "English", value: "English" },
    { label: "Arabic", value: "Arabic" },
    { label: "Urdu", value: "Urdu" },
  ]
  const countries = [{ label: "Bangladesh", value: "Bangladesh" }]

  const [overview, setOverview] = useState("")

  const nameValue = form.watch("name")

  useEffect(() => {
    if (nameValue) {
      // TODO: need to generate slug with validation
      // Generate slug from the name by converting it to lowercase and replacing spaces with hyphens
      const generatedSlug = convertSlug(nameValue)

      // Update the slug field in the form state
      form.setValue("slug", generatedSlug)
    }
    if (overview) {
      form.setValue("overview", overview)
    }
  }, [nameValue, overview, form.setValue, form.formState.errors])

  const [postInstitute, { isLoading }] = usePostInstituteMutation()

  async function onSubmit(data: z.infer<typeof FormSchema>, event) {
    if (data.overview === '<p dir="auto"></p>') {
      data.overview = undefined
    }

    const formAction = event.nativeEvent.submitter.value

    const imageFile = data.photo[0]

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    }
    try {
      const compressedImageFile = await imageCompression(imageFile, options)

      const formData = new FormData()

      // Append fields from data to FormData
      Object.entries(data).forEach(([key, value]) => {
        if (key === "photo") {
          formData.append(key, compressedImageFile, imageFile.name)
        } else {
          if (value !== undefined && value !== null && value !== "") {
            formData.append(key, value as string)
          }
        }
      })

      if (formAction === Status.PUBLISHED) {
        formData.append("status", Status.PUBLISHED)
      }

      postInstitute(formData)
        .unwrap()
        .then((data) => {
          refetch()
          toast.success(data.message)
          form.reset()
          router.push("/dashboard/institutes")
        })
        .catch((error) => {
          toast.error(error.data.message)
        })
    } catch (error) {
      toast.error(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(error, null, 2)}</code>
        </pre>,
      )
    }
  }

  return (
    <>
      <Card className={cn("mx-auto max-w-7xl")}>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-6 space-y-6"
            >
              {/* instituteCategoryId */}
              <CategoriesField form={form} />

              {/* name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Name <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Institute name"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Enter the full name of the institute (e.g., "XYZ
                      University"). Recommended to english
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* slug */}
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Slug <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Institute slug"
                        {...field}
                        readOnly
                      />
                    </FormControl>
                    <FormDescription>
                      Enter a short, URL-friendly version of the institute name
                      (e.g., "xyz-university"). We recommended to use default.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-6 md:grid-cols-2">
                {/* codeType */}
                <FormField
                  control={form.control}
                  name="codeType"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="mb-2">
                        Code Type <span className="text-destructive">*</span>
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "justify-between",
                                !field.value && "text-muted-foreground",
                              )}
                              {...field}
                            >
                              {field.value
                                ? codeType.find(
                                    (ct) => ct.value === field.value,
                                  )?.label
                                : "Select codeType"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="p-0">
                          <Command>
                            <CommandInput placeholder="Search codeType..." />
                            <CommandList>
                              <CommandEmpty>No codeType found.</CommandEmpty>
                              <CommandGroup>
                                {codeType.map((ct) => (
                                  <CommandItem
                                    value={ct.label}
                                    key={ct.value}
                                    onSelect={() => {
                                      form.setValue("codeType", ct.value)
                                    }}
                                  >
                                    {ct.label}
                                    <Check
                                      className={cn(
                                        "ml-auto",
                                        ct.value === field.value
                                          ? "opacity-100"
                                          : "opacity-0",
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        Choose the type of code that corresponds to the
                        institute (e.g., "Institution Code").
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* code */}
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Code <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Institute code"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Provide the unique code for the institute (e.g.,
                        "XYZ-123").
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* photo */}
              <FormField
                control={form.control}
                name="photo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Photo <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Button
                        variant="outline"
                        className="w-full"
                        type="button"
                      >
                        <input
                          type="file"
                          className="hidden w-full"
                          id="fileInput"
                          accept="image/*"
                          onBlur={field.onBlur}
                          name={field.name}
                          onChange={(e) => {
                            field.onChange(e.target.files)
                            setSelectedImage(e.target.files?.[0] || null)
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

              <div className="grid gap-6 md:grid-cols-2">
                {/* language */}
                <FormField
                  control={form.control}
                  name="language"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>
                        Language <span className="text-destructive">*</span>
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "justify-between",
                                !field.value && "text-muted-foreground",
                              )}
                              {...field}
                            >
                              {field.value
                                ? languages.find(
                                    (language) =>
                                      language.value === field.value,
                                  )?.label
                                : "Select language"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="p-0">
                          <Command>
                            <CommandInput placeholder="Search language..." />
                            <CommandList>
                              <CommandEmpty>No language found.</CommandEmpty>
                              <CommandGroup>
                                {languages.map((language) => (
                                  <CommandItem
                                    value={language.label}
                                    key={language.value}
                                    onSelect={() => {
                                      form.setValue("language", language.value)
                                    }}
                                  >
                                    {language.label}
                                    <Check
                                      className={cn(
                                        "ml-auto",
                                        language.value === field.value
                                          ? "opacity-100"
                                          : "opacity-0",
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        Select the primary language used at the institute (e.g.,
                        "Bengali").
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* foundedDate */}
                <FormField
                  control={form.control}
                  name="foundedDate"
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
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {/* phoneNumber */}
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Phone <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Institute phone"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Enter the primary contact phone number for the institute
                        (e.g., "+8801234567890").
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* contactEmail */}
                <FormField
                  control={form.control}
                  name="contactEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Contact Email{" "}
                        <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Institute email"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Enter the contact email address for the institute (e.g.,
                        "info@xyzuniversity.edu").
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {/* website */}
                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>website</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Institute website"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Provide the official website URL of the institute (e.g.,
                        "www.xyzuniversity.edu") (Optional).
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* principalName */}
                <FormField
                  control={form.control}
                  name="principalName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Principal Name{" "}
                        <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Institute principal name"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Enter the name of the principal of the institute.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {/* country */}
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>
                        country <span className="text-destructive">*</span>
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "justify-between",
                                !field.value && "text-muted-foreground",
                              )}
                              {...field}
                            >
                              {field.value
                                ? countries.find(
                                    (country) => country.value === field.value,
                                  )?.label
                                : "Select country"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="p-0">
                          <Command>
                            <CommandInput placeholder="Search country..." />
                            <CommandList>
                              <CommandEmpty>No country found.</CommandEmpty>
                              <CommandGroup>
                                {countries.map((country) => (
                                  <CommandItem
                                    value={country.label}
                                    key={country.value}
                                    onSelect={() => {
                                      form.setValue("country", country.value)
                                    }}
                                  >
                                    {country.label}
                                    <Check
                                      className={cn(
                                        "ml-auto",
                                        country.value === field.value
                                          ? "opacity-100"
                                          : "opacity-0",
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        Select the country where the institute is located.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* division */}
                <DivisionField form={form} />
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {/* district */}
                <DistrictField form={form} />

                {/* subDivision */}
                {/* TODO: will do in future at this moment for bd */}

                {/* subDistrict */}
                <SubDistrictField
                  form={form}
                  district={form.watch().district}
                />
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                {/* addressLine1 */}
                <FormField
                  control={form.control}
                  name="addressLine1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        addressLine1 <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Institute addressLine1"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Enter the primary address line (e.g., street address,
                        house number, P.O. Box).
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* addressLine2 */}
                <FormField
                  control={form.control}
                  name="addressLine2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>addressLine2</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Institute addressLine2"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Enter an apartment, suite, unit, or floor number.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* postalCode */}
                <FormField
                  control={form.control}
                  name="postalCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        postalCode <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Institute postalCode"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Enter the postal/ZIP code for the institute's location.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {/* latitude */}
                <FormField
                  control={form.control}
                  name="latitude"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        latitude <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Institute latitude"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Enter the latitude coordinate for the institute’s
                        geographical location.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* longitude */}
                <FormField
                  control={form.control}
                  name="longitude"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        longitude <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Institute longitude"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Enter the longitude coordinate for the institute’s
                        geographical location.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <Suspense fallback={<Loading.Spinner />}>
                  <Label>Overview</Label>
                  {/* <Editor setContentHtml={setOverview} /> */}
                </Suspense>
              </div>

              <div className="flex items-center justify-between">
                <Button
                  variant="destructive"
                  type="reset"
                  disabled={isLoading}
                  onClick={() => {
                    form.reset()
                  }}
                >
                  Cancel
                </Button>
                <div className="flex gap-6">
                  <Button
                    type="submit"
                    name="action"
                    value={Status.PUBLISHED}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <BarLoader color="#fff" />
                    ) : (
                      "Create and Publish"
                    )}
                  </Button>
                  <Button
                    variant="secondary"
                    type="submit"
                    name="action"
                    value={Status.DRAFT}
                    disabled={isLoading}
                  >
                    {isLoading ? <BarLoader color="#fff" /> : "Save as draft"}
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  )
}
