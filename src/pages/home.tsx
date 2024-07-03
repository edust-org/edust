import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";

export default function Home() {
  return (
    <div className="h-screen flex items-center justify-center flex-col gap-4">
      <Typography variant="h1">Welcome to our Edust!</Typography>
      <Button>Button</Button>
    </div>
  );
}
