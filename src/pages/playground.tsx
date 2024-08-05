import { Typography } from "@/components/ui";
import { Counter } from "@/features/counter";

export const Playground = () => {
  return (
    <>
      <div className="container">
        <Typography variant="h1">Playground</Typography>
        <Counter />
      </div>
    </>
  );
};
