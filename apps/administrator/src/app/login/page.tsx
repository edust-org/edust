"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
// import { toast } from "@/components/hooks/use-toast"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { setAuthentication } from "@/lib/store/features"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { AccountType } from "@/types"
import { cn } from "@/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { getSession, signIn } from "next-auth/react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { useForm } from "react-hook-form"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { BarLoader } from "react-spinners"
import { toast } from "sonner"
import { z } from "zod"

import { useState } from "react"

const FormSchema = z.object({
  email: z.string().min(2, {
    message: "email must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
})

export default function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const dispatch = useAppDispatch()
  const authState = useAppSelector((state) => state.authentication)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

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
    dispatch(
      setAuthentication({
        ...authState,
        isLoading: true,
      }),
    )

    const result = await signIn(AccountType.LOCAL, {
      email: userData.email,
      password: userData.password,
      redirect: false,
    })
    if (result?.error) {
      dispatch(
        setAuthentication({
          ...authState,
          isLoading: false,
        }),
      )
      toast.error(result?.error)
    } else {
      const data = await getSession()
      if (data && data?.user) {
        toast.success("Log in successfully!")
        dispatch(
          setAuthentication({
            ...authState,
            isAuthenticated: true,
            isLoading: false,
            user: {
              id: data.user.id,
              name: data.user.name,
              username: data.user.username,
              email: data.user.email,
              profilePic: data.user.profilePic,
              systemRole: data.user.systemRole,
              organizationRoles: data.user.organizationRoles,
            },
          }),
        )
      }
      redirect("/")
    }
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className={cn("flex flex-col gap-6", className)} {...props}>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Login</CardTitle>
              <CardDescription>
                Enter your email below to login to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="flex flex-col gap-3"
                >
                  <div className="flex flex-col gap-6">
                    <div className="grid gap-2">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="example@gmail.com"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-6">
                    <div className="grid gap-2">
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
                                  placeholder="**********"
                                  {...field}
                                />
                                <button
                                  type="button"
                                  className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-500"
                                  onClick={onVisibilityClick}
                                >
                                  {isPasswordVisible ? (
                                    <FaEye />
                                  ) : (
                                    <FaEyeSlash />
                                  )}
                                </button>
                              </div>
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <Button type="submit">Login</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
