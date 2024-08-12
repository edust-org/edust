import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
} from "@/components/ui";

export const Pages = () => {
  return (
    <div className="grid grid-cols-1 gap-4">
      <section>
        <Card>
          <CardHeader>
            <CardTitle>Page Name</CardTitle>
            <CardDescription>
              Used to identify your page in the sites.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Input placeholder="Home" />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button>Create now</Button>
          </CardFooter>
        </Card>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Home</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>This is your home page</CardDescription>
          </CardContent>
          <CardFooter className="flex justify-end gap-4">
            <Button variant={"destructive"}>Delete</Button>
            <Button>Edit</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>About</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>This is your home page</CardDescription>
          </CardContent>
          <CardFooter className="flex justify-end gap-4">
            <Button variant={"destructive"}>Delete</Button>
            <Button>Edit</Button>
          </CardFooter>
        </Card>
      </section>
    </div>
  );
};
