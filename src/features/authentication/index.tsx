import React from "react";
import { SignIn } from "./sign-in";
import { SignUp } from "./sign-up";

interface Props {
  component: "signIn" | "signUp";
}

export const Authentication: React.FC<Props> = ({ component }) => {
  return <>{component === "signIn" ? <SignIn /> : <SignUp />}</>;
};
