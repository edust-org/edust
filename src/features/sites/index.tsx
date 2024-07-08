import { Button, Typography } from "@/components/ui";

export const Sites = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <Typography variant="h1">Your Organization Name</Typography>
        <Typography variant="h2">organization-user-name</Typography>
        <Button>Customize your sites</Button>
      </div>
    </div>
  );
};
