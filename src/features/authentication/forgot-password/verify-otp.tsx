import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Typography,
} from "@/components/ui";
import { BarLoader } from "react-spinners";
import assets from "@/assets/images";
import { MailOpen } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "@/hooks/shadcn-ui";
import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";
import { useCheckOtpMutation } from "@/app/api/v0/auth";

const FormSchema = z.object({
  otp: z.string().min(4, {
    message: "Your one-time password must be 4 characters.",
  }),
});
export const VerifyOtp = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const email = searchParams.get("email");
  const [checkOtp, { isLoading }] = useCheckOtpMutation();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      otp: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    checkOtp({ otp: parseInt(data?.otp), email })
      .unwrap()
      .then((res) => {
        if (res?.status) {
          toast({
            variant: "success",
            title: res?.message,
          });
          setSearchParams(`step=reset-password&email=${email}`);
        }
      })
      .catch((error) => {
        // error?.data?.status
        if (error) {
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
        <title>Forgot Password | Edust</title>
      </Helmet>
      <div className="flex h-screen items-center justify-center p-4">
        <Form {...form}>
          <div className="w-full p-4 shadow sm:max-w-96 md:max-w-[450px] md:p-6">
            <div className="space-y-4 text-center">
              <img src={assets.logo} alt="" className="mx-auto" width={250} />
              <div className="space-y-2">
                <Typography variant="h3">Verify your email</Typography>
                <Typography>
                  Enter OTP sent to <strong>{email}</strong>
                </Typography>
                <MailOpen className="mx-auto h-28 w-28" />
              </div>
            </div>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 text-center"
            >
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>One-Time OPT For Password</FormLabel>
                    <FormControl>
                      <div className="flex justify-center">
                        <InputOTP maxLength={4} {...field}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                          </InputOTPGroup>
                        </InputOTP>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? <BarLoader color="#fff" /> : "Verify OTP"}
              </Button>
            </form>
            <Typography className="text-center text-sm text-muted-foreground">
              Didn’t receive the OTP yet?
              <br />
              Check your email address or
              <Button variant={"link"}>Resend OTP</Button>
            </Typography>
          </div>
        </Form>
      </div>
    </>
  );
};
