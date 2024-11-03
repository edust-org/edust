import { Button, Card, Typography } from "@/components/ui";

const InstituteNotFound = () => {
  return (
    <Card className="mt-5 max-w-96 p-8">
      <Typography affects="removePaddingMargin" variant="h2">
        Institutes not found{" "}
      </Typography>
      <Typography affects="removePaddingMargin" variant="p">
        If you want to create a new institute you need to register here.
      </Typography>
      <Button className="mt-4 w-full">Create new one</Button>
    </Card>
  );
};

export default InstituteNotFound;
