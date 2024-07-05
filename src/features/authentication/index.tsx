import React from "react";
import { SignIn } from "./sign-in";
import SignUp from "./sign-up";

interface Props {
  compMode: "signIn" | "signUp";
}

export const Authentication: React.FC<Props> = ({ compMode }) => {
  return <>{compMode === "signIn" ? <SignIn /> : <SignUp />}</>;
};
