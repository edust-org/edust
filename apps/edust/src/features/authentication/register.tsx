import { useRegisterMutation } from "@/app/api/v0/auth"
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
import { zodResolver } from "@hookform/resolvers/zod"
import { MailOpen } from "lucide-react"
import React, { useState } from "react"
import { Helmet } from "react-helmet-async"
import { useForm } from "react-hook-form"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { Link } from "react-router"
import { BarLoader } from "react-spinners"
import { z } from "zod"
import { SocialAuth } from "./social-auth"
import { LogoEdust } from "@/components"
import { Layout } from "./layout"
import { toast } from "sonner"

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({ message: "Invalid email address." }).min(2, {
    message: "Email must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
})

export const Register: React.FC = () => {
  const [confirmAccount, setConfirmAccount] = useState({
    isConfirm: false,
    message: "",
  })
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  const onVisibilityClick = () => {
    setIsPasswordVisible((prev) => !prev)
  }

  const [register, { isLoading }] = useRegisterMutation()
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    register(data)
      .unwrap()
      .then((res) => {
        if (res.status) {
          toast.success(res?.message)

          setConfirmAccount({
            ...confirmAccount,
            isConfirm: true,
            message: res.message,
          })
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
        <title>Sign Up for Edust - Start Your Journey</title>
      </Helmet>
      <Layout>
        {confirmAccount.isConfirm && (
          <div className="w-full bg-background p-4 shadow sm:max-w-96 md:max-w-[450px] md:p-6">
            <div className="space-y-4 text-center">
              <div className="text-center">
                <Link to={"/"}>
                  <LogoEdust className="mb-3 inline-block" width={250} />
                </Link>{" "}
              </div>
              <div className="space-y-2">
                <Typography variant="h3">Confirm your account</Typography>
                <MailOpen className="mx-auto h-28 w-28" />
                <Typography variant="large">
                  {confirmAccount.message}
                </Typography>
              </div>
              <Typography>
                Not in inbox or spam folder?{" "}
                <Button variant={"link"} disabled>
                  Resend
                </Button>
              </Typography>
            </div>
          </div>
        )}
        {!confirmAccount.isConfirm && (
          <Form {...form}>
            <div className="w-full rounded bg-background p-4 shadow sm:max-w-96 md:max-w-[450px] md:p-6">
              <div className="text-center">
                <Link to={"/"}>
                  <LogoEdust className="mb-3 inline-block" width={250} />
                </Link>{" "}
              </div>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Example Name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email or Phone</FormLabel>
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
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={isPasswordVisible ? "text" : "password"}
                            placeholder="********"
                            {...field}
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-500"
                            onClick={onVisibilityClick}
                          >
                            {isPasswordVisible ? <FaEye /> : <FaEyeSlash />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  {isLoading ? <BarLoader color="#fff" /> : "Create an account"}
                </Button>
              </form>
              <div className="my-4">
                <SocialAuth />
              </div>
              <div className="mb-4 mt-4 flex items-center justify-center gap-4">
                <Typography className="text-sm">
                  Already have an account?{" "}
                  <Link
                    to={"/auth/login"}
                    className="ml-1 inline-block underline"
                  >
                    Login
                  </Link>
                </Typography>
              </div>
            </div>
          </Form>
        )}
      </Layout>
    </>
  )
}
