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
import { useLoginMutation } from "@/lib/store/api/v0/auth"
import { setAuthentication } from "@/lib/store/features"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { BarLoader } from "react-spinners"
import { toast } from "sonner"
import { z } from "zod"

import { useState } from "react"

import { Layout } from "../../components/layout"

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
  const dispatch = useAppDispatch()
  const authState = useAppSelector((state) => state.authentication)
  const [login, { isLoading }] = useLoginMutation()
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      // password: process.env.NODE_ENV === "development" ? "password2024" : "",
      password: "password2024",
    },
  })

  const onVisibilityClick = () => {
    setIsPasswordVisible((prev) => !prev)
  }

  function onSubmit(userData: z.infer<typeof FormSchema>) {
    dispatch(
      setAuthentication({
        ...authState,
        isLoading: true,
      }),
    )

    login(userData)
      .unwrap()
      .then((data) => {
        if (data?.status) {
          toast.success(data.message)

          dispatch(
            setAuthentication({
              ...authState,
              isAuthenticated: true,
              isLoading: false,
              user: data?.data,
              auth: {
                accessToken: data?.auth.accessToken,
                expiresAt: data?.auth.expiresAt,
              },
            }),
          )
          router.push("/")
        }
      })
      .catch((error) => {
        dispatch(
          setAuthentication({
            ...authState,
            isLoading: false,
          }),
        )
        if (error?.data?.status) {
          toast.error(error?.data?.message)
        }
      })
  }

  return (
    <>
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
            <div className="my-4">{/* <SocialAuth /> */}</div>
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
