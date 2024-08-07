import { Button, Typography } from "@/components/ui";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/shadcn-ui";
import { Counter } from "@/features/counter";

export const Playground = () => {
  const { toast } = useToast();
  return (
    <>
      <div className="container">
        <Typography variant="h1">Playground</Typography>
        <Counter />

        <Button
          variant="outline"
          onClick={() => {
            toast({
              variant: "destructive",
              title: "Uh oh! Something went wrong.",
              description: "There was a problem with your request.",
              action: <ToastAction altText="Try again">Try again</ToastAction>,
            });
          }}
        >
          Show Toast
        </Button>
      </div>
    </>
  );
};
