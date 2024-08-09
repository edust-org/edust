import { Button, Typography } from "@/components/ui";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/shadcn-ui";
import { Counter } from "@/features/counter";
import { Navbar } from "@/components";

export const Playground = () => {
  const { toast } = useToast();
  return (
    <>
      <Navbar />
      <div className="container">
        <Typography variant="h1">Playground</Typography>
        <Counter />

        <Button
          variant="outline"
          onClick={() => {
            toast({
              title: "Uh oh! Something went wrong.",
              description: "There was a problem with your request.",
              action: <ToastAction altText="Try again">Try again</ToastAction>,
            });
          }}
        >
          default
        </Button>
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
          destructive
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            toast({
              variant: "success",
              title: "Uh oh! Something went wrong.",
              description: "There was a problem with your request.",
              action: <ToastAction altText="Try again">Try again</ToastAction>,
            });
          }}
        >
          success
        </Button>
      </div>
    </>
  );
};
