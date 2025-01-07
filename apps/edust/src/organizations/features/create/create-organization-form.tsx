import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/components/ui"
import { Checkbox } from "@/components/ui/checkbox"
import { useCreateOrganizationMutation } from "@/app/api/v0/organizations"
import { useLocation, useNavigate } from "react-router"
import { BarLoader } from "react-spinners"
import { useEffect } from "react"
import { toast } from "sonner"
import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { setAuthentication } from "@/app/features"
import { OrganizationRoles, User } from "@/types"

const FormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Name is required" })
    .max(100, { message: "Name must not exceed 100 characters" }),
  orgUsername: z
    .string()
    .trim()
    .min(1, { message: "Organization username is required" })
    .regex(/^[a-zA-Z0-9_-]+$/, {
      message:
        "Organization username can only contain letters, numbers, underscores, and hyphens",
    })
    .max(100, {
      message: "Organization username must not exceed 100 characters",
    }),
  isAccepted: z.boolean(),
})

export const CreateOrganizationForm = () => {
  const dispatch = useAppDispatch()
  const authState = useAppSelector((state) => state.authentication)
  const navigate = useNavigate()
  const location = useLocation()
  const redirectPath = location.state?.from?.pathname || "/"
  const [postOrganization, { isLoading }] = useCreateOrganizationMutation()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      orgUsername: "",
      isAccepted: false,
    },
  })

  const nameValue = form.watch("name")
  useEffect(() => {
    if (nameValue) {
      // TODO: need to generate slug with validation
      // Generate slug from the name by converting it to lowercase and replacing spaces with hyphens
      const orgUsername = nameValue.trim().toLowerCase().replace(/\s+/g, "-")

      // Update the slug field in the form state
      form.setValue("orgUsername", orgUsername)
    }
  }, [nameValue, form.setValue])

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const payload = { name: data.name, orgUsername: data.orgUsername }
    postOrganization(payload)
      .unwrap()
      .then((res) => {
        toast.success(res.message)

        if (res.data.role.id) {
          const organizationRoles: OrganizationRoles[] = [
            {
              id: res.data.role.id,
              role: res.data.role.name,
              organization: res.data,
            },
          ]
          if (authState.user) {
            const user: User = {
              ...authState?.user,
              organizationRoles,
            }

            dispatch(
              setAuthentication({
                ...authState,
                user,
              }),
            )
          }
        }

        navigate(redirectPath)
      })
      .catch((error) => {
        if (error?.data?.status) {
          toast.error(error?.data?.message)
        }
      })
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Organization Name</FormLabel>
                <FormControl>
                  <Input placeholder="name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="orgUsername"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Organization Unique orgUsername</FormLabel>
                <FormControl>
                  <Input placeholder="orgUsername" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isAccepted"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Accept terms and conditions</FormLabel>
                </div>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full"
            disabled={!form.getValues("isAccepted")}
          >
            {isLoading ? <BarLoader color="#fff" /> : "Create an organization"}
          </Button>
        </form>
      </Form>
    </>
  )
}
