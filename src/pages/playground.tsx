import { useLogoutMutation } from "@/app/api/v0/auth";
import { Button, Typography } from "@/components/ui";
import { Counter } from "@/features/counter";

export const Playground = () => {
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

  return (
    <>
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
