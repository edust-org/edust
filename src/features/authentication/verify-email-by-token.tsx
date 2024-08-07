import { useVerifyEmailByTokenMutation } from "@/app/api/v0/auth";
import assets from "@/assets/images";
import { Typography } from "@/components/ui";
import { useToast } from "@/hooks/shadcn-ui";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BeatLoader } from "react-spinners";

export const VerifyEmailByToken: React.FC = () => {
  const { toast } = useToast();
  const params = useParams();
  const [verify, { isLoading, isError }] = useVerifyEmailByTokenMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (params.token) {
      verify(params.token)
        .unwrap()
        .then((res) => {
          console.log(res);
          if (res?.data.status) {
            toast({
              variant: "default",
              title: "Please sign in your account!",
              description: res?.data.message,
            });

            navigate("/auth/sign-in");
          }
        })
        .catch((err) => {
          if (err?.data?.error) {
            toast({
              variant: "destructive",
              title: "Uh oh! Something went wrong.",
              description: err?.data?.error,
            });
          }
        });
    }
  }, [navigate, params.token, toast, verify]);

  return (
    <div className="h-screen flex items-center justify-center p-4">
      <div className="shadow p-4 md:p-6 w-full sm:max-w-96 md:max-w-[450px]">
        <div className="text-center space-y-4">
          <img src={assets.logo} alt="" className="mx-auto" width={250} />
          <div className="space-y-2">
            <Typography variant="h3">Verifying Your Account</Typography>
            {isLoading && <BeatLoader />}
          </div>
          {!isError && <Typography>Working for verification</Typography>}
          {isError && (
            <Typography className="text-red-500">
              Close this tab and Please Try again!
            </Typography>
          )}
        </div>
      </div>
    </div>
  );
};
