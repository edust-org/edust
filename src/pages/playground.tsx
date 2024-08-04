import { useLogoutMutation } from "@/app/api/v0/auth";
import {  useGetProfileQuery } from "@/app/api/v0/profile";
import { setAuthentication } from "@/app/features/authentication";
import {
  setProfile,
  setProfileError,
  setProfileLoading,
} from "@/app/features/profile";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { Navbar } from "@/components";
import { Button, Typography } from "@/components/ui";
import { Counter } from "@/features/counter";
import { useEffect } from "react";

export const Playground = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.profile.user);
  const isAuthenticated = useAppSelector((state) => state.auth);
  const { data, error, isLoading } = useGetProfileQuery();

  const [logout] = useLogoutMutation();
  console.log({ isAuthenticated, user });
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
    if (isLoading) {
      dispatch(setProfileLoading(true));
    } else if (error) {
      dispatch(setAuthentication({ isAuthenticated: false }));
      dispatch(setProfileError(error.message));
    } else if (data?.data.user) {
      dispatch(setAuthentication({ isAuthenticated: true }));
      dispatch(setProfile(data?.data.user));
    }
  }, [data, dispatch, error, isLoading]);

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
