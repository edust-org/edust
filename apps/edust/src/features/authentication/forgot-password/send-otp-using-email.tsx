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
  Typography,
} from "@/components/ui"
import { useSearchParams } from "react-router"
import { Helmet } from "react-helmet-async"
import { useForgotPasswordMutation } from "@/app/api/v0/auth"
import { BarLoader } from "react-spinners"
import { CircleHelp } from "lucide-react"
import { Link } from "react-router"
import { Layout } from "../layout"
import { LogoEdust } from "@/components"
import { toast } from "sonner"

const FormSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }).min(2, {
    message: "Email must be at least 2 characters.",
  }),
})
export const SendOtpUsingEmail = () => {
  const [, setSearchParams] = useSearchParams()

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    forgotPassword(data)
      .unwrap()
      .then((res) => {
        if (res?.status) {
          toast.success(res?.message)
          setSearchParams(`step=verify-otp&email=${data.email}`)
        }
      })
      .catch((error) => {
        if (error?.data?.status) {
          toast.error(error?.data?.message)
        }
      })
  }

  return (
    <>
      <Helmet>
        <title>Forgot Password | Edust</title>
      </Helmet>
      <Layout className="flex h-screen items-center justify-center p-4">
        <Form {...form}>
          <div className="w-full rounded bg-background p-4 shadow sm:max-w-96 md:max-w-[450px] md:p-6">
            <div className="space-y-4 text-center">
              <div className="text-center">
                <Link to={"/"}>
                  <LogoEdust className="mb-3 inline-block" width={250} />
                </Link>{" "}
              </div>{" "}
              <div className="space-y-2">
                <Typography variant="h3">Forgot Password?</Typography>
                <CircleHelp className="mx-auto h-28 w-28" />
              </div>
            </div>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter Your Email Account</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="example@gmail.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center justify-end gap-4">
                <Link to={"/auth/login"}>
                  <Button type="button" variant={"outline"}>
                    Cancel
                  </Button>
                </Link>
                <Button type="submit" className="" disabled={isLoading}>
                  {isLoading ? <BarLoader color="#fff" /> : "Reset Password"}
                </Button>
              </div>
            </form>
          </div>
        </Form>
      </Layout>
    </>
  )
}
