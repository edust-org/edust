import { useVerifyEmailByTokenMutation } from "@/app/api/v0/auth";
import assets from "@/assets/images";
import { Typography } from "@/components/ui";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BeatLoader } from "react-spinners";
export const VerifyEmailByToken: React.FC = () => {
  const params = useParams();

  const [verify, { isLoading, isError }] = useVerifyEmailByTokenMutation();

  useEffect(() => {
    if (params.token) {
      verify(params.token)
        .then((res) => console.log(JSON.stringify(res)))
        .catch((err) => {
          console.error(console.log(JSON.stringify(err)));
        });
    }
  }, [params.token, verify]);

  return (
    <div className="h-screen flex items-center justify-center p-4">
      <div className="shadow p-4 md:p-6 w-full sm:max-w-96 md:max-w-[450px]">
        <div className="text-center space-y-4">
          <img src={assets.logo} alt="" className="mx-auto" width={250} />
          <div className="space-y-2">
            <Typography variant="h3">Verifying Your Account</Typography>
            {isLoading && <BeatLoader />}
          </div>
          <Typography>Working for verification</Typography>
        </div>
      </div>
    </div>
  );
};
