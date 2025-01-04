import { GuestHome } from "./guest-home"
import { PrivateHome } from "./private-home"

export const Home = {
  GuestHome,
  PrivateHome,
}
/*
import { useAppSelector } from "@/app/hooks";
import { lazy } from "react";
import { HaveAnOrgAccount } from "@/organizations/components";


// TODO: need to change it's not work HaveAnOrgAccount
export const Home = () => {
  const auth = useAppSelector((state) => state.auth.authentication);

  return (
    <>
      {auth?.user && <HaveAnOrgAccount auth={auth} />}

      {auth.isAuthenticated ? <PrivateHome /> : <GuestHome />}
    </>
  );
};
*/
