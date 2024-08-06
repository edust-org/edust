import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
} from "@/components/ui";
import { SocialAuth } from "./social-auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useLoginMutation } from "@/app/api/v0/auth";
import React from "react";
import { useAppDispatch } from "@/app/hooks";
import { setAuthentication } from "@/app/features/authentication";

const FormSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }).min(2, {
    message: "Email must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export const SignIn: React.FC = () => {
  const dispatch = useAppDispatch();
  const [login, { isLoading, isError }] = useLoginMutation();
  const navigate = useNavigate();
  const location = useLocation();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    login(data)
      .then(() => {
        dispatch(setAuthentication({ isAuthenticated: true, user: null }));
        navigate(location.state?.from?.pathname || "/");
      })
      .catch((err) => console.error(err));
  }

  return (
    <>
      {console.log({ isLoading, isError })}
      <Helmet>
        <title>Sign In to Edist - Access Your Account</title>
      </Helmet>
      <div className="h-screen flex items-center justify-center p-4">
        <Form {...form}>
          <div className="shadow p-4 md:p-6 w-full sm:max-w-96 md:max-w-[450px]">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
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
                      <Input
                        type="password"
                        placeholder="********"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Sign In
              </Button>
            </form>

            <div className="my-4">
              <SocialAuth />
            </div>
            <Typography className="text-center mb-4">
              <Link to={"/auth/sign-in"} className="hover:underline transition">
                Forgot Your Password?
              </Link>
            </Typography>
            <div className="mb-4 flex items-center justify-between gap-4 flex-col sm:flex-row">
              <Typography>Don’t have an account?</Typography>
              <Link to={"/auth/sign-up"}>
                <Button variant={"outline"} size={"sm"}>
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </Form>
      </div>
    </>
  );
};
