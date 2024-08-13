import {
  usePostPagesMutation,
  useDeletePageByIdMutation,
  useGetAllPagesQuery,
} from "@/app/api/v0/organizations";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
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
  Skeleton,
} from "@/components/ui";
import { toast } from "@/hooks/shadcn-ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertDialog, AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { BarLoader } from "react-spinners";
import { z } from "zod";

const FormSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
});

export const SitesPages = () => {
  const { data, isLoading, refetch } = useGetAllPagesQuery();
  const [deletePage, { isLoading: isPageDeleteLoading }] =
    useDeletePageByIdMutation();
  const [postPage, { isLoading: isCreateLoading }] = usePostPagesMutation();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const content = `{"html":"<body id=\\"i3kk\\"><div id=\\"i3jw\\">${data?.name}</div><div id=\\"iysl\\">I am from ${data?.name}</div></body>","css":"* { box-sizing: border-box; } body {margin: 0;}*{box-sizing:border-box;}body{margin-top:0px;margin-right:0px;margin-bottom:0px;margin-left:0px;}*{box-sizing:border-box;}body{margin-top:0px;margin-right:0px;margin-bottom:0px;margin-left:0px;}*{box-sizing:border-box;}body{margin-top:0px;margin-right:0px;margin-bottom:0px;margin-left:0px;}*{box-sizing:border-box;}body{margin-top:0px;margin-right:0px;margin-bottom:0px;margin-left:0px;}*{box-sizing:border-box;}body{margin-top:0px;margin-right:0px;margin-bottom:0px;margin-left:0px;}*{box-sizing:border-box;}body{margin-top:0px;margin-right:0px;margin-bottom:0px;margin-left:0px;}*{box-sizing:border-box;}body{margin-top:0px;margin-right:0px;margin-bottom:0px;margin-left:0px;}#i3jw{padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;font-size:4em;font-family:Verdana, Geneva, sans-serif;font-weight:700;text-align:center;}#iysl{padding:10px;}"}`;

    const mockData = { ...data, content: JSON.stringify(JSON.parse(content)) };

    postPage(mockData)
      .unwrap()
      .then((res) => {
        refetch();
        if (res?.status) {
          toast({
            variant: "success",
            title: res?.message,
          });
        }
        form.reset();
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
                <Button type="submit" disabled={isCreateLoading}>
                  {isCreateLoading ? <BarLoader color="#fff" /> : "Create new"}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {isLoading &&
          Array(3)
            .fill(1)
            .map((_, index) => (
              <div key={index} className="bg-white shadow p-6 space-y-6">
                <Skeleton className="w-full h-6" />
                <Skeleton className="w-full h-6" />
                <div className="flex justify-end gap-4">
                  <Skeleton className="w-20 h-10" />
                  <Skeleton className="w-14 h-10" />
                </div>
              </div>
            ))}
        {data?.data?.map((page) => (
          <Card key={page?.id}>
            <CardHeader>
              <CardTitle>{page.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>This is your {page.name} page</CardDescription>
            </CardContent>
            <CardFooter className="flex justify-end gap-4">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant={"destructive"}
                    disabled={
                      page?.name?.toLowerCase() === "home" ||
                      isPageDeleteLoading
                    }
                  >
                    {isPageDeleteLoading ? (
                      <BarLoader color="#fff" />
                    ) : (
                      "Delete"
                    )}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => {
                        deletePage(page?.id)
                          .unwrap()
                          .then((res) => {
                            if (res?.status) {
                              refetch();
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
                      }}
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <Link to={`${page.id}`} target="_blank">
                <Button>Edit</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </section>
    </div>
  );
};
