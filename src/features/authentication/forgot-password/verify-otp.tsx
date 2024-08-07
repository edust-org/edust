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
import { BarLoader } from "react-spinners";
import assets from "@/assets/images";
import { CircleHelp, MailOpen } from "lucide-react";
import { Link } from "react-router-dom";

const FormSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }).min(2, {
    message: "Email must be at least 2 characters.",
  }),
});

export const VerifyOtp = () => {
  const isLoading = false;
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });
  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }
  return (
    <>
      <Form {...form}>
        <div className="shadow p-4 md:p-6 w-full sm:max-w-96 md:max-w-[450px]">
          <div className="text-center space-y-4">
            <img src={assets.logo} alt="" className="mx-auto" width={250} />
            <div className="space-y-2">
              <Typography variant="h3">Verify your email</Typography>
              <Typography>
                Enter OTP sent to <strong>user@example.com</strong>
              </Typography>
              <MailOpen className="mx-auto w-28 h-28" />
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
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? <BarLoader color="#fff" /> : "Verify OTP"}
            </Button>
          </form>
          <div className="text-center mt-4">
            <Typography>
              Didn’t receive the OTP yet?
              <br />
              Check your email address or
              <Button variant={"link"}x>Resend OTP</Button>
            </Typography>
          </div>
        </div>
      </Form>
    </>
  );
};
