import { useGetInstitutesCategoriesQuery } from "@/app/api/v0/public"
import {
  Button,
  Calendar,
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Typography,
} from "@/components/ui"
import { Status } from "@/types"
import { cn } from "@/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon, Check, ChevronsUpDown, ImageUp } from "lucide-react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import imageCompression from "browser-image-compression"
import Editor from "./editor"
import { useBoolean } from "usehooks-ts"
import { usePostInstituteMutation } from "@/app/api/v0/institutes"
import { toast as toastShadcn } from "@/hooks/shadcn-ui"
import { toast } from "sonner"
import { BarLoader } from "react-spinners"

const MAX_FILE_SIZE = 1024 * 1024 * 5 // 5mb
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
]
const FormSchema = z.object({
  institute_category_id: z
    .string({
      required_error: "Please select a category.",
    })
    .min(1, "category is required"),
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),

  code_type: z.string().trim().min(1, { message: "code_type required" }),
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
  founded_date: z.preprocess(
    (arg) => (typeof arg === "string" ? new Date(arg) : arg),
    z.date(),
  ),

  phone_number: z.string().trim().min(1, { message: "required" }),
  contact_email: z
    .string()
    .trim()
    .min(1, { message: "required" })
    .email({ message: "Invalid email format" }),
  website: z.string().trim(),
  principal_name: z.string().trim().min(1, { message: "required" }),

  country: z.string().trim().min(1, { message: "required" }),
  state_or_division: z.string().trim().min(1, { message: "required" }),
  county_or_district: z.string().trim().min(1, { message: "required" }),
  city_or_town: z.string().trim().min(1, { message: "required" }),
  street_or_house_number: z.string().trim().min(1, { message: "required" }),
  postal_code: z.string().trim().min(1, { message: "required" }),
  latitude: z.string().min(1, { message: "required" }),
  longitude: z.string().min(1, { message: "required" }),

  overview: z.string().trim(),
})

export const InstitutesCreate = () => {
  const { data: categoriesData } = useGetInstitutesCategoriesQuery({})
  const [postInstitute, { isLoading }] = usePostInstituteMutation()
  const categories =
    categoriesData?.data?.items?.map((category) => ({
      label: category?.name,
      value: category.id,
    })) || []

  const { value: isError, setTrue, setFalse } = useBoolean(false)
  const [overview, setOverview] = useState("")

  const [selectedImage, setSelectedImage] = useState<File | null>(null)

  const languages = [{ label: "Bengali", value: "bengali" }]
  const codeType = [{ label: "EIIN", value: "EIIN" }]

  const countries = [{ label: "Bangladesh", value: "bangladesh" }]

  const state_or_division = [
    { label: "Dhaka", value: "dhaka" },
    { label: "Chittagong", value: "chittagong" },
    { label: "Khulna", value: "khulna" },
    { label: "Rajshahi", value: "rajshahi" },
    { label: "Sylhet", value: "sylhet" },
    { label: "Barisal", value: "barisal" },
    { label: "Rangpur", value: "rangpur" },
  ]

  const county_or_district = [
    { label: "Dhaka", value: "dhaka" },
    { label: "Chattogram", value: "chattogram" },
    { label: "Khulna", value: "khulna" },
    { label: "Rajshahi", value: "rajshahi" },
    { label: "Sylhet", value: "sylhet" },
    { label: "Barisal", value: "barisal" },
    { label: "Rangpur", value: "rangpur" },
  ]

  // TODO! remove default values
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      institute_category_id: "0bb6a543-b905-4d53-8bd1-5163a81768eb",
      name: "Dhaka college",
      slug: "dhaka-college",
      code_type: "EIIN",
      code: "66666",
      photo: undefined,
      language: "bengali",
      founded_date: new Date(),
      phone_number: "01760255882",
      contact_email: "edustorg@gmail.com",
      website: "www.edust.org",
      principal_name: "Edust Org",

      country: "bangladesh",
      state_or_division: "khulna",
      county_or_district: "khulna",
      city_or_town: "Alamdanga, Chuadanga",
      street_or_house_number: "High way",
      postal_code: "7210",
      latitude: "23.766110669210573",
      longitude: "88.95013133825535",
      overview: "",
    },
  })

  const nameValue = form.watch("name")

  useEffect(() => {
    if (nameValue) {
      // TODO: need to generate slug with validation
      // Generate slug from the name by converting it to lowercase and replacing spaces with hyphens
      const generatedSlug = nameValue.trim().toLowerCase().replace(/\s+/g, "-")
      // Update the slug field in the form state
      form.setValue("slug", generatedSlug)
    }
    if (
      overview &&
      !overview.includes(
        '<h1 dir="auto" style="text-align: center">Welcome to Edust!</h1>',
      )
    ) {
      form.setValue("overview", overview)
    }

    if (Object.keys(form.formState.errors).length) {
      setTrue()
    } else {
      setFalse()
    }
  }, [nameValue, overview, form.setValue, form.formState.errors])

  async function onSubmit(data: z.infer<typeof FormSchema>, event) {
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
          formData.append(key, value as string)
        }
      })

      if (formAction === Status.PUBLISHED) {
        formData.append("status", Status.PUBLISHED)
      }

      postInstitute(formData)
        .unwrap()
        .then((data) => {
          toast.success(data.message)
        })
        .catch((error) => {
          toast.error(error.data.message)
        })
    } catch (error) {
      toastShadcn({
        title: "error",
        variant: "destructive",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(error, null, 2)}</code>
          </pre>
        ),
      })
    }
  }

  return (
    <>
      <div
        className={cn(
          "mx-auto max-w-4xl rounded bg-white p-6 shadow",
          `${isError ? "shadow-destructive" : ""}`,
        )}
      >
        <Tabs defaultValue="edit">
          <TabsList>
            <TabsTrigger value="edit">Edit</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          <TabsContent value="edit">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="mt-6 space-y-6"
              >
                {/* institute_category_id */}
                <FormField
                  control={form.control}
                  name="institute_category_id"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>
                        Categories <span className="text-destructive">*</span>
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
                            >
                              {field.value
                                ? categories.find(
                                    (category) =>
                                      category.value === field.value,
                                  )?.label
                                : "Select category"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="p-0">
                          <Command>
                            <CommandInput placeholder="Search category..." />
                            <CommandList>
                              <CommandEmpty>No category found.</CommandEmpty>
                              <CommandGroup>
                                {categories.map((category) => (
                                  <CommandItem
                                    value={category.label}
                                    key={category.value}
                                    onSelect={() => {
                                      form.setValue(
                                        "institute_category_id",
                                        category.value,
                                      )
                                    }}
                                  >
                                    {category.label}
                                    <Check
                                      className={cn(
                                        "ml-auto",
                                        category.value === field.value
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
                        This is the category that will be used in the
                        institutes.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
                        This is your public display name. It can be your real
                        name or a pseudonym. You can only change this once every
                        30 days.
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
                        />
                      </FormControl>
                      <FormDescription>
                        This is your public display name. It can be your real
                        name or a pseudonym. You can only change this once every
                        30 days.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid gap-6 md:grid-cols-2">
                  {/* code_type */}
                  <FormField
                    control={form.control}
                    name="code_type"
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
                              >
                                {field.value
                                  ? codeType.find(
                                      (ct) => ct.value === field.value,
                                    )?.label
                                  : "Select code_type"}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="p-0">
                            <Command>
                              <CommandInput placeholder="Search code_type..." />
                              <CommandList>
                                <CommandEmpty>No code_type found.</CommandEmpty>
                                <CommandGroup>
                                  {codeType.map((ct) => (
                                    <CommandItem
                                      value={ct.label}
                                      key={ct.value}
                                      onSelect={() => {
                                        form.setValue("code_type", ct.value)
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
                          This is the code_type that will be used in the
                          institutes.
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
                          This is your public display code.
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
                                        form.setValue(
                                          "language",
                                          language.value,
                                        )
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
                          This is the language that will be used in the
                          institutes.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* founded_date */}
                  <FormField
                    control={form.control}
                    name="founded_date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>
                          Date of birth{" "}
                          <span className="text-destructive">*</span>
                        </FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground",
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() ||
                                date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormDescription>
                          Your date of birth is used to calculate your age.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  {/* phone_number */}
                  <FormField
                    control={form.control}
                    name="phone_number"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          phone <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Institute phone"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          This is your public display name. It can be your real
                          name or a pseudonym. You can only change this once
                          every 30 days.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* contact_email */}
                  <FormField
                    control={form.control}
                    name="contact_email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          contact_email{" "}
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
                          This is your public display name. It can be your real
                          name or a pseudonym. You can only change this once
                          every 30 days.
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
                          This is your public display name. It can be your real
                          name or a pseudonym. You can only change this once
                          every 30 days.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* principal_name */}
                  <FormField
                    control={form.control}
                    name="principal_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          principal_name{" "}
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
                          This is your public display name. It can be your real
                          name or a pseudonym. You can only change this once
                          every 30 days.
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
                              >
                                {field.value
                                  ? countries.find(
                                      (country) =>
                                        country.value === field.value,
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
                          This is the country that will be used in the
                          institutes.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* state_or_division */}
                  <FormField
                    control={form.control}
                    name="state_or_division"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>
                          state_or_division{" "}
                          <span className="text-destructive">*</span>
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
                              >
                                {field.value
                                  ? state_or_division.find(
                                      (stateDivision) =>
                                        stateDivision.value === field.value,
                                    )?.label
                                  : "Select state_or_division"}
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
                                  {state_or_division.map((stateDivision) => (
                                    <CommandItem
                                      value={stateDivision.label}
                                      key={stateDivision.value}
                                      onSelect={() => {
                                        form.setValue(
                                          "state_or_division",
                                          stateDivision.value,
                                        )
                                      }}
                                    >
                                      {stateDivision.label}
                                      <Check
                                        className={cn(
                                          "ml-auto",
                                          stateDivision.value === field.value
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
                          This is the stateDivision that will be used in the
                          institutes.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  {/* county_or_district */}
                  <FormField
                    control={form.control}
                    name="county_or_district"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>
                          county_or_district{" "}
                          <span className="text-destructive">*</span>
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
                              >
                                {field.value
                                  ? county_or_district.find(
                                      (country) =>
                                        country.value === field.value,
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
                                  {county_or_district.map((country) => (
                                    <CommandItem
                                      value={country.label}
                                      key={country.value}
                                      onSelect={() => {
                                        form.setValue(
                                          "county_or_district",
                                          country.value,
                                        )
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
                          This is the country that will be used in the
                          institutes.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* city_or_town */}
                  <FormField
                    control={form.control}
                    name="city_or_town"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          city_or_town{" "}
                          <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Institute city_or_town"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          This is your public display city_or_town. It can be
                          your real name or a pseudonym. You can only change
                          this once every 30 days.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  {/* street_or_house_number */}
                  <FormField
                    control={form.control}
                    name="street_or_house_number"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          street_or_house_number{" "}
                          <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Institute street_or_house_number"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          This is your public display street_or_house_number. It
                          can be your real name or a pseudonym. You can only
                          change this once every 30 days.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* postal_code */}
                  <FormField
                    control={form.control}
                    name="postal_code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          postal_code{" "}
                          <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Institute postal_code"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          This is your public display postal_code. It can be
                          your real name or a pseudonym. You can only change
                          this once every 30 days.
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
                          This is your public display latitude. It can be your
                          real name or a pseudonym. You can only change this
                          once every 30 days.
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
                          This is your public display longitude. It can be your
                          real name or a pseudonym. You can only change this
                          once every 30 days.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div>
                  <Label>Overview</Label>
                  <Editor setContentHtml={setOverview} />
                </div>

                <div className="flex items-center justify-between">
                  <Button
                    variant="destructive"
                    type="reset"
                    disabled={isLoading}
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
          </TabsContent>
          <TabsContent value="preview">Preview</TabsContent>
        </Tabs>
      </div>
    </>
  )
}
