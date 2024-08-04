import { useLogoutMutation } from "@/app/api/v0/auth";
import { profileApi, useGetProfileQuery } from "@/app/api/v0/profile";
import { setAuthentication } from "@/app/features/authentication";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { Navbar } from "@/components";
import { Button, Typography } from "@/components/ui";
import { Counter } from "@/features/counter";
import { useEffect } from "react";

export const Playground = () => {
  const dispatch = useAppDispatch();
  const { data } = useGetProfileQuery();

  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  console.log(isAuthenticated);

  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      console.log("Logged out successfully");
      // Optionally, redirect the user or update local state
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  useEffect(() => {
    dispatch(profileApi.endpoints.getProfile.initiate());

    if (data) {
      // Set authentication state based on profile data
      dispatch(setAuthentication({ isAuthenticated: true }));
    }
  }, [data, dispatch]);

  return (
    <>
      <Navbar />
      <div className="container">
        <Typography variant="h1">Playground</Typography>

        <Button variant={"destructive"} onClick={handleLogout}>
          Logout
        </Button>

        <Counter />
      </div>
    </>
  );
};
