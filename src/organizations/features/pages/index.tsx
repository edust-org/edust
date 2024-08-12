import {
  useCreatePagesMutation,
  useGetAllPagesQuery,
} from "@/app/api/v0/organizations";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
} from "@/components/ui";
import { toast } from "@/hooks/shadcn-ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { BarLoader } from "react-spinners";
import { z } from "zod";

const FormSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
});

export const Pages = () => {
  const { data, isLoading, refetch } = useGetAllPagesQuery();
  const [createPage, { isLoading: createLoading }] = useCreatePagesMutation();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const content =
      '{"html":"<body id=\\"i3kk\\"><div id=\\"i3jw\\">About Page</div><div id=\\"iysl\\">I am from About page</div></body>","css":"* { box-sizing: border-box; } body {margin: 0;}*{box-sizing:border-box;}body{margin-top:0px;margin-right:0px;margin-bottom:0px;margin-left:0px;}*{box-sizing:border-box;}body{margin-top:0px;margin-right:0px;margin-bottom:0px;margin-left:0px;}*{box-sizing:border-box;}body{margin-top:0px;margin-right:0px;margin-bottom:0px;margin-left:0px;}*{box-sizing:border-box;}body{margin-top:0px;margin-right:0px;margin-bottom:0px;margin-left:0px;}*{box-sizing:border-box;}body{margin-top:0px;margin-right:0px;margin-bottom:0px;margin-left:0px;}*{box-sizing:border-box;}body{margin-top:0px;margin-right:0px;margin-bottom:0px;margin-left:0px;}*{box-sizing:border-box;}body{margin-top:0px;margin-right:0px;margin-bottom:0px;margin-left:0px;}#i3jw{padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;font-size:4em;font-family:Verdana, Geneva, sans-serif;font-weight:700;text-align:center;}#iysl{padding:10px;}"}';

    const mockData = { ...data, content };

    createPage(mockData)
      .unwrap()
      .then((res) => {
        form.reset();
        if (res?.status) {
          toast({
            variant: "success",
            title: res?.message,
          });
        }
      })
      .catch((error) => {
        if (error?.data?.status) {
          toast({
            variant: "destructive",
            title: error?.data?.message,
          });
        }
      });
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      <section>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Card>
              <CardHeader>
                <CardTitle>Page Name</CardTitle>
                <CardDescription>
                  Used to identify your page in the sites.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      {/* <FormLabel>Email</FormLabel> */}
                      <FormControl>
                        <Input type="text" placeholder="home" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button type="submit" disabled={createLoading}>
                  {createLoading ? <BarLoader color="#fff" /> : "Create new"}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {data?.data?.map((page) => (
          <Card>
            <CardHeader>
              <CardTitle>{page.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>This is your {page.name} page</CardDescription>
            </CardContent>
            <CardFooter className="flex justify-end gap-4">
              <Button
                variant={"destructive"}
                disabled={page?.name?.toLowerCase() === "home"}
              >
                Delete
              </Button>
              <Button>
                <Link to={`${page.id}`}>Edit</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </section>
    </div>
  );
};
