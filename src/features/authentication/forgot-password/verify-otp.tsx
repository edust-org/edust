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

const FormSchema = z.object({
  otp: z.string().min(4, {
    message: "Your one-time password must be 4 characters.",
  }),
});
export const VerifyOtp = () => {
  const isLoading = false;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      otp: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
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
    </>
  );
};
