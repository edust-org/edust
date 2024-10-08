import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Button,
  Calendar,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
  Typography,
} from "@/components/ui";
import { format } from "date-fns";
import { CalendarIcon, ImageUp } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/shadcn-ui";

const MAX_FILE_SIZE = 1024 * 1024 * 5;
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const FormSchema = z.object({
  category: z.string().min(1, "Category is required"),
  nameEn: z.string().min(1, "Name (en) is required"),
  nameBn: z.string().min(1, "Name (bn) is required"),
  eiin: z.string().min(1, "EIIN is required"),
  overview: z.string().min(1, "Overview is required"),
  photo: z
    .any()
    .refine((file) => {
      if (!file) return true; // Allow no file
      return file?.[0]?.size <= MAX_FILE_SIZE;
    }, `Max image size is 5MB.`)
    .refine((file) => {
      if (!file) return true; // Allow no file
      return ACCEPTED_IMAGE_MIME_TYPES.includes(file?.[0]?.type);
    }, "Only .jpg, .jpeg, .png, and .webp formats are supported.")
    .optional(), // Photo can be optional

  urls: z
    .any()
    .optional() // Allow the value to be optional or of any type
    .refine(
      (val) => {
        if (!val || typeof val !== "string") return true; // Allow no value or non-string
        return z.string().url().safeParse(val).success; // If string, must be a valid URL
      },
      {
        message: "Must be a valid URL or left empty",
      },
    ),
  board: z.string().min(1, "Board is required"),
  foundedDate: z.date({ required_error: "Initialized Date is required" }),
  country: z.string().min(1, "Country is required"),
  state: z.string().min(1, "State is required"),
  city: z.string().min(1, "City is required"),
  postalCode: z.string().min(1, "Postal Code is required"),
  latitude: z.string().min(1, "Latitude is required"),
  longitude: z.string().min(1, "Longitude is required"),
  phone: z.string().min(1, "Phone is required"),
  email: z.string().email("Invalid email address"),
  website: z.string().optional(),
  principalName: z.string().min(1, "Principal name is required"),
  principalAge: z.string().optional(),
  tenureStart: z.date({ required_error: "Date is required" }),
});

export const InstitutesCreate = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      category: "",
      nameEn: "",
      nameBn: "",
      eiin: "",
      overview: "",
      photo: undefined,
      urls: "",
      board: "",
      foundedDate: new Date(),
      country: "",
      state: "",
      city: "",
      postalCode: "",
      latitude: "",
      longitude: "",
      phone: "",
      email: "",
      website: "",
      principalName: "",
      principalAge: "",
      tenureStart: new Date(),
    },
  });
  const { toast } = useToast();

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <>
      <div className="flex justify-center pt-5">
        <Form {...form}>
          <div
            className={`w-full rounded-md bg-white p-4 shadow sm:max-w-96 md:max-w-[450px] md:p-6 lg:max-w-[650px]`}
          >
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4 md:gap-8"
            >
              <div className="border-b-2 border-b-gray-200 pb-6">
                <Typography variant="h4">Create institute</Typography>
                <Typography variant="p" affects="removePaddingMargin">
                  This is how others will see you on the site.
                </Typography>
              </div>

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category to display" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="college">College</SelectItem>
                        <SelectItem value="University">University</SelectItem>
                        <SelectItem value="School">School</SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="nameEn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name (en)</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Institute name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="nameBn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name (bn)</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Institute name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="eiin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>EIIN (unique)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="EIIN" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="overview"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Overview</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Overview the institute"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Tabs defaultValue="file">
                <TabsList>
                  <TabsTrigger value="file">File</TabsTrigger>
                  <TabsTrigger value="link">CDN Link</TabsTrigger>
                </TabsList>
                <TabsContent value="file">
                  <FormField
                    control={form.control}
                    name="photo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Photo</FormLabel>
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
                                field.onChange(e.target.files);
                                setSelectedImage(e.target.files?.[0] || null);
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
                </TabsContent>
                <TabsContent value="link">
                  <FormField
                    control={form.control}
                    name="urls"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>URLs</FormLabel>
                        <FormControl>
                          <Input
                            type="url"
                            placeholder="https://res.cloudinary.com/dmiewayfu/image/upload/v1724572264/edust-org/logo/logo_yiycml.jpg"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>
              </Tabs>

              <div className="flex w-full items-center gap-4 md:gap-8">
                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name="board"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Board</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a institute board" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Jashore">Jashore</SelectItem>
                            <SelectItem value="Dhaka">Dhaka</SelectItem>
                            <SelectItem value="Cumilla">Cumilla</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name="foundedDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="mb-1 mt-1.5">
                          Founded Date
                        </FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button variant={"outline"}>
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
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Address */}
              <div className="flex flex-col gap-4">
                <Typography variant="h4">Address</Typography>

                <div className="flex w-full flex-col items-center gap-4 md:flex-row md:gap-8">
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a country" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Bangladesh">
                                Bangladesh
                              </SelectItem>
                              <SelectItem value="Palestine">
                                Palestine
                              </SelectItem>
                              <SelectItem value="Afghanistan">
                                Afghanistan
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State/Division</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="State/Division" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Khulna">Khulna</SelectItem>
                              <SelectItem value="Dhaka">Dhaka</SelectItem>
                              <SelectItem value="Kustia">Kustia</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="flex w-full flex-col items-center gap-4 md:flex-row md:gap-8">
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City/Town</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a city/town" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Jhenaidah">
                                Jhenaidah
                              </SelectItem>
                              <SelectItem value="Chuadanga">
                                Chuadang
                              </SelectItem>
                              <SelectItem value="Barishal">Barishal</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name="postalCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Postal Code</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Postal Code"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="flex w-full flex-col items-center gap-4 md:flex-row md:gap-8">
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name="latitude"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Latitude</FormLabel>
                          <FormControl>
                            <Input type="text" placeholder="lat" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name="longitude"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Longitude</FormLabel>
                          <FormControl>
                            <Input type="text" placeholder="long" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div className="flex flex-col gap-4">
                <Typography variant="h4">Contact</Typography>

                <div className="flex w-full flex-col items-center gap-4 md:flex-row md:gap-8">
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input type="tel" placeholder="Phone" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="Email"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="flex w-full flex-col items-center gap-4 md:flex-row md:gap-8">
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name="website"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Website</FormLabel>
                          <FormControl>
                            <Input
                              type="url"
                              placeholder="https://www.example.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex-1"></div>
                </div>
              </div>

              {/* Principal Details */}
              <div className="flex flex-col gap-4">
                <Typography variant="h4">Principal Details</Typography>

                <div className="flex w-full flex-col items-center gap-4 md:flex-row md:gap-8">
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name="principalName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input type="text" placeholder="Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name="principalAge"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Age</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="Age" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="flex w-full flex-col items-center gap-4 md:flex-row md:gap-8">
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name="tenureStart"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel className="mb-1 mt-1.5">
                            Tenure Start
                          </FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button variant={"outline"}>
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex-1"></div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Button variant="destructive" type="reset">
                  Cancel
                </Button>
                <div className="flex gap-6">
                  <Button type="submit">Create and Publish</Button>
                  <Button variant="secondary" type="submit">
                    Save as draft
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </Form>
      </div>
    </>
  );
};
