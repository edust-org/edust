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
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Checkbox } from "@/components/ui/checkbox";
import { useRegisterMutation } from "@/app/api/v0/auth";

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

export const SignUp = () => {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const [register, { isLoading, error }] = useRegisterMutation();
  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    register(data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.error(err));
    // if you new create an account show a single time a popup for create organization or not
    // localStorage.setItem("isOrgAcc", JSON.stringify(true));

    // and redirect home route
    // navigate("/", { replace: true });
  }

  return (
    <>
      {console.log({ isLoading, error })}
      <Helmet>
        <title>Sign Up for Edust - Start Your Journey</title>
      </Helmet>
      <div className="h-screen flex items-center justify-center p-4">
        <Form {...form}>
          <div className="shadow p-4 md:p-6 w-full sm:max-w-96 md:max-w-[450px]">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                Create an account
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
      </div>
    </>
  );
};
