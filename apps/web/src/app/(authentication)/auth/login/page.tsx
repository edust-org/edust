"use client"

import { LogoEdust } from "@/components"
import { useAuthMeLazy } from "@/hooks/react-query"
import { useAuthStore } from "@/store"
import { AccountType } from "@edust/types"
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
} from "@edust/ui"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { BarLoader } from "react-spinners"
import { toast } from "sonner"
import { z } from "zod"

import { useState } from "react"

import { Layout } from "../../components/layout"
import { SocialAuth } from "../../components/social-auth"

const FormSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }).min(2, {
    message: "Email must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
})

export default function Login() {
  const router = useRouter()
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { data: authMeData, trigger } = useAuthMeLazy(false)

  const { setAuthMe, logOut } = useAuthStore()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: process.env.NODE_ENV === "development" ? "password2024" : "",
    },
  })

  const onVisibilityClick = () => {
    setIsPasswordVisible((prev) => !prev)
  }

  async function onSubmit(userData: z.infer<typeof FormSchema>) {
    setIsLoading(true)
    const result = await signIn(AccountType.LOCAL, {
      email: userData.email,
      password: userData.password,
      redirect: false,
    })
    if (result?.error) {
      logOut()
      toast.error(result?.error)
    }

    if (result?.ok) {
      trigger()
      const user = authMeData?.data || null
      setAuthMe(user)
      router.push("/")
      router.refresh()
    }
    setIsLoading(false)
  }

  return (
    <>
      <title>Log In to Edust</title>
      <Layout>
        <Form {...form}>
          <div className="bg-background w-full rounded p-4 shadow sm:max-w-96 md:max-w-[450px] md:p-6">
            <div className="text-center">
              <Link href={"/"}>
                <LogoEdust className="mb-3 inline-block" width={250} />
              </Link>
            </div>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
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
                    <div className="flex items-center justify-between">
                      <FormLabel>Password</FormLabel>
                      <Link
                        href={"/auth/forgot-password"}
                        className="ml-auto inline-block text-sm underline"
                      >
                        Forgot Your Password?
                      </Link>
                    </div>
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

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? <BarLoader color="#fff" /> : "Login"}
              </Button>
            </form>
            <div className="my-4">
              <SocialAuth />
            </div>
            <div className="mb-4 mt-4 flex items-center justify-center gap-4">
              <Typography className="text-sm">
                Don&apos;t have an account?
                <Link
                  href={"/auth/register"}
                  className="ml-1 inline-block underline"
                >
                  Register
                </Link>
              </Typography>
            </div>
          </div>
        </Form>
      </Layout>
    </>
  )
}
