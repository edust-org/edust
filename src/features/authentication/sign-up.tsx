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
import { Checkbox } from "@/components/ui/checkbox";
import { useRegisterMutation } from "@/app/api/v0/auth";
import React, { useState } from "react";
import { useAppDispatch } from "@/app/hooks";
import assets from "@/assets/images";
import { MailOpen } from "lucide-react";
import { BarLoader } from "react-spinners";

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
});

export const SignUp: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [confirmAccount, setConfirmAccount] = useState({
    isConfirm: false,
    message: "",
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const [register, { isLoading, error, data }] = useRegisterMutation();
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const result = await register(data).unwrap();
      setConfirmAccount({
        ...confirmAccount,
        isConfirm: true,
        message: result.data.message,
      });
    } catch (err) {
      console.log(err?.data?.error);
    }
  }

  return (
    <>
      {console.log({ isLoading, error, data })}
      <Helmet>
        <title>Sign Up for Edust - Start Your Journey</title>
      </Helmet>
      <div className="h-screen flex items-center justify-center p-4">
        {confirmAccount.isConfirm && (
          <div className="shadow p-4 md:p-6 w-full sm:max-w-96 md:max-w-[450px]">
            <div className="text-center space-y-4">
              <img src={assets.logo} alt="" className="mx-auto" width={250} />
              <div className="space-y-2">
                <Typography variant="h3">Confirm your account</Typography>
                <MailOpen className="mx-auto w-28 h-28" />
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
            <div className="shadow p-4 md:p-6 w-full sm:max-w-96 md:max-w-[450px]">
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
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
                <div className="items-top flex space-x-2">
                  <Checkbox id="sign_up_term_con" />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="sign_up_term_con"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Accept terms and conditions
                    </label>
                  </div>
                </div>
                <Button type="submit" className="w-full">
                  {isLoading ? <BarLoader color="#fff" /> : "Create an account"}
                </Button>
              </form>

              <div className="my-4">
                <SocialAuth />
              </div>
              <div className="mb-4 flex items-center justify-between gap-4 flex-col sm:flex-row">
                <Typography>Already have an account?</Typography>
                <Link to={"/auth/sign-in"}>
                  <Button variant={"outline"} size={"sm"}>
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
          </Form>
        )}
      </div>
    </>
  );
};
