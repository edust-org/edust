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
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Checkbox } from "@/components/ui/checkbox";
import { useRegisterMutation } from "@/app/api/v0/auth";
import React, { useState } from "react";
import assets from "@/assets/images";
import { MailOpen } from "lucide-react";
import { BarLoader } from "react-spinners";
import { toast } from "@/hooks/shadcn-ui";
import { useBoolean } from "usehooks-ts";
import { SocialAuth } from "./social-auth";

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
  const [confirmAccount, setConfirmAccount] = useState({
    isConfirm: false,
    message: "",
  });
  const { value, toggle } = useBoolean(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const [register, { isLoading }] = useRegisterMutation();
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    register(data)
      .unwrap()
      .then((res) => {
        if (res.status) {
          toast({
            variant: "success",
            title: res?.message,
          });

          setConfirmAccount({
            ...confirmAccount,
            isConfirm: true,
            message: res.message,
          });
        }
      })
      .catch((error) => {
        if (error?.data?.status) {
          toast({
            variant: "destructive",
            title: error?.data?.message,
          });
        }
      });
  }

  return (
    <>
      <Helmet>
        <title>Sign Up for Edust - Start Your Journey</title>
      </Helmet>
      <div className="flex h-screen items-center justify-center p-4">
        {confirmAccount.isConfirm && (
          <div className="w-full p-4 shadow sm:max-w-96 md:max-w-[450px] md:p-6">
            <div className="space-y-4 text-center">
              <img src={assets.logo} alt="" className="mx-auto" width={250} />
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
            <div className="w-full rounded-sm p-4 shadow sm:max-w-96 md:max-w-[450px] md:p-6">
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
                  <Checkbox id="sign_up_term_con" onCheckedChange={toggle} />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="sign_up_term_con"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Accept{" "}
                      <Link
                        to={"http://google.com"}
                        className="transition hover:underline"
                      >
                        terms and conditions
                      </Link>
                    </label>
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading || !value}
                >
                  {isLoading ? <BarLoader color="#fff" /> : "Create an account"}
                </Button>
              </form>

              <div className="my-4">
                <SocialAuth />
              </div>

              <div className="mb-2 flex flex-col items-center justify-between gap-4 sm:flex-row">
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
