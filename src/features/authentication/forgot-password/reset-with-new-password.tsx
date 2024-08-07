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
import { useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useLoginMutation } from "@/app/api/v0/auth";
import { lazy, useState } from "react";
import { useAppDispatch } from "@/app/hooks";
import { setAuthentication } from "@/app/features/authentication";
import { toast } from "@/hooks/shadcn-ui";
import { BarLoader } from "react-spinners";
import assets from "@/assets/images";
import { CircleHelp, KeySquare } from "lucide-react";
import { Link } from "react-router-dom";

const VerifyOtp = lazy(() =>
  import("./verify-otp").then((module) => ({
    default: module.VerifyOtp,
  }))
);

const FormSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }).min(2, {
    message: "Email must be at least 2 characters.",
  }),
});
export const ResetWithNewPassword = () => {
  const [isVerifyOtp, setIsVerifyOtp] = useState({
    isShow: true,
  });

  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const location = useLocation();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    setIsVerifyOtp({ ...isVerifyOtp, isShow: true });
  }

  return (
    <>
      <Helmet>
        <title>Sign In to Edist - Access Your Account</title>
      </Helmet>
      <div className="h-screen flex items-center justify-center p-4">
        <Form {...form}>
          <div className="shadow p-4 md:p-6 w-full sm:max-w-96 md:max-w-[450px]">
            <div className="text-center space-y-4">
              <img src={assets.logo} alt="" className="mx-auto" width={250} />
              <div className="space-y-2">
                <Typography variant="h3">Change Your Password</Typography>
                <Typography>
                  Enter your new password below to change your password
                </Typography>
                <KeySquare className="mx-auto w-28 h-28" />
              </div>
            </div>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter your new password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="******" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center justify-end gap-4">
                <Link to={"/auth/sign-in"}>
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
      </div>
    </>
  );
};
