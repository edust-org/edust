"use client"

import { LogoEdust } from "@/components"
import { useCheckOtp } from "@/hooks/react-query"
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  Typography,
} from "@edust/ui"
import { zodResolver } from "@hookform/resolvers/zod"
import { MailOpen } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { BarLoader } from "react-spinners"
import { toast } from "sonner"
import { z } from "zod"

const FormSchema = z.object({
  otp: z.string().min(4, {
    message: "Your one-time password must be 4 characters.",
  }),
})
export const VerifyOtp = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const email = searchParams.get("email")
  const { mutateAsync: checkOtp, isPending: isLoading } = useCheckOtp()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      otp: "",
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    checkOtp({ otp: data.otp, email })
      .then((res) => {
        if (res?.status) {
          toast.success(res?.message)
          router.push(`?step=reset-password&email=${email}&otp=${data.otp}`)
        }
      })
      .catch((error) => {
        // error?.data?.status
        if (error) {
          toast.error(error?.data?.message)
        }
      })
  }

  return (
    <>
      {/* <Helmet>
        <title>Forgot Password | Edust</title>
      </Helmet> */}
      <div className="bg-muted flex h-screen items-center justify-center p-4">
        <Form {...form}>
          <div className="bg-background w-full p-4 shadow sm:max-w-96 md:max-w-[450px] md:p-6">
            <div className="space-y-4 text-center">
              <LogoEdust width={250} className="mb-3 inline-block" />
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
            <Typography className="text-muted-foreground text-center text-sm">
              Didn’t receive the OTP yet?
              <br />
              Check your email address or
              <Button variant={"link"}>Resend OTP</Button>
            </Typography>
          </div>
        </Form>
      </div>
    </>
  )
}
