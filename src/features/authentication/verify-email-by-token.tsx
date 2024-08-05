import { useVerifyEmailByTokenMutation } from "@/app/api/v0/auth";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

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

  return <div>VerifyEmailByToken</div>;
};
