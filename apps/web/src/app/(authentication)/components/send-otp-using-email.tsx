"use client"

import { LogoEdust } from "@/components"
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
import { useForgotPassword } from "@/hooks/react-query"
import { zodResolver } from "@hookform/resolvers/zod"
import { CircleHelp } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { BarLoader } from "react-spinners"
import { toast } from "sonner"
import { z } from "zod"

import { Layout } from "./layout"

const FormSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }).min(2, {
    message: "Email must be at least 2 characters.",
  }),
})
export const SendOtpUsingEmail = () => {
  const router = useRouter()

  const { mutateAsync: forgotPassword, isPending: isLoading } =
    useForgotPassword()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    forgotPassword(data)
      .then((res) => {
        if (res?.status) {
          toast.success(res?.message)
          router.push(`step=verify-otp&email=${data.email}`, { scroll: false })
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
      {/* <Helmet>
        <title>Forgot Password | Edust</title>
      </Helmet> */}
      <Layout className="flex h-screen items-center justify-center p-4">
        <Form {...form}>
          <div className="bg-background w-full rounded p-4 shadow sm:max-w-96 md:max-w-[450px] md:p-6">
            <div className="space-y-4 text-center">
              <div className="text-center">
                <Link href={"/"}>
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
                <Link href={"/auth/login"}>
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
