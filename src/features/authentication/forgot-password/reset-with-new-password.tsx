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
import { useNavigate, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useResetPasswordMutation } from "@/app/api/v0/auth";
import { toast } from "@/hooks/shadcn-ui";
import { BarLoader } from "react-spinners";
import assets from "@/assets/images";
import { KeySquare } from "lucide-react";
import { Link } from "react-router-dom";

const FormSchema = z.object({
  newPassword: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});
export const ResetWithNewPassword = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const navigate = useNavigate();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      newPassword: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log({ newPassword: data.newPassword, email });
    resetPassword({ newPassword: data.newPassword, email })
      .unwrap()
      .then((res) => {
        if (res?.status) {
          toast({
            variant: "success",
            title: res?.message,
          });
          navigate("/auth/sign-in");
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
        <title>Sign In to Edist - Access Your Account</title>
      </Helmet>
      <div className="flex h-screen items-center justify-center p-4">
        <Form {...form}>
          <div className="w-full p-4 shadow sm:max-w-96 md:max-w-[450px] md:p-6">
            <div className="space-y-4 text-center">
              <img src={assets.logo} alt="" className="mx-auto" width={250} />
              <div className="space-y-2">
                <Typography variant="h3">Change Your Password</Typography>
                <Typography>
                  Enter your new password below to change your password
                </Typography>
                <KeySquare className="mx-auto h-28 w-28" />
              </div>
            </div>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="newPassword"
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
