import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useLoginMutation } from "@/app/api/v0/auth"
import {
  setAuthentication,
  setProfileMode,
} from "@/app/features/authentication"
import { useAppDispatch, useAppSelector } from "@/app/hooks"
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
import { toast as toastShadcn } from "@/hooks/shadcn-ui"
import { useState } from "react"
import { Helmet } from "react-helmet-async"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { BarLoader } from "react-spinners"
import { SocialAuth } from "./social-auth"
import { Roles } from "@/types"
import { toast } from "sonner"

const FormSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }).min(2, {
    message: "Email must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
})

export const Login: React.FC = () => {
  const dispatch = useAppDispatch()
  const authState = useAppSelector((state) => state.authentication.auth)
  const [login, { isLoading }] = useLoginMutation()
  const navigate = useNavigate()
  const location = useLocation()
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
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
        const redirectPath = location.state?.from?.pathname || "/"
        if (data?.status) {
          toast.success(data.message)

          dispatch(
            setAuthentication({
              isAuthenticated: true,
              isLoading: false,
              user: data?.data,
              auth: {
                token: data?.auth.token,
                expiresAt: data?.auth.expiresAt,
              },
            }),
          )

          const organizationRoles = data.data?.organization_roles?.map(
            (role) => ({
              id: role.id,
              role: role.role,
              name: role.organization.name,
            }),
          )
          
          dispatch(
            setProfileMode({
              systemRole: data.data?.system_role,
              organizationRoles,
              activeMode: Roles.USER,
            }),
          )

          navigate(redirectPath)
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
          toastShadcn({
            variant: "destructive",
            title: error?.data?.message,
          })
        }
      })
  }

  return (
    <>
      <Helmet>
        <title>Sign In to Edist - Access Your Account</title>
        <meta
          name="description"
          content="Sign in to Edist to access your account."
        />
        <meta
          property="og:title"
          content="Sign In to Edist - Access Your Account"
        />
        <meta
          property="og:description"
          content="Sign in to Edist to access your account."
        />
      </Helmet>
      <div className="flex h-screen items-center justify-center p-4">
        <Form {...form}>
          <div className="w-full rounded-md p-4 shadow sm:max-w-96 md:max-w-[450px] md:p-6">
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
                        to={"/auth/forgot-password"}
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
                Don't have an account?{" "}
                <Link
                  to={"/auth/register"}
                  className="ml-1 inline-block underline"
                >
                  Register
                </Link>
              </Typography>
            </div>
          </div>
        </Form>
      </div>
    </>
  )
}
