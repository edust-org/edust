import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/components/ui";
import { Checkbox } from "@/components/ui/checkbox";
import { usePostOrganizationMutation } from "@/app/api/v0/organizations";
import { toast } from "@/hooks/shadcn-ui";
import { useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";
import { useGetUserQuery } from "@/app/api/v0/user";

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Enter your Organization name",
  }),
  org_username: z.string().min(2, {
    message: "Enter your Organization name",
  }),
});

export const CreateOrganizationForm = () => {
  const navigate = useNavigate();
  const [postOrganization, { isLoading }] = usePostOrganizationMutation();
  const { refetch } = useGetUserQuery();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      org_username: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    postOrganization(data)
      .unwrap()
      .then((res) => {
        if (res?.status) {
          toast({
            variant: "success",
            title: res?.message,
          });
        }
        refetch()
          .then((res) => {
            console.log({ res });
            if (res) {
              navigate("/organizations");
            }
          })
          .catch((error) => {
            if (error) {
              toast({
                variant: "destructive",
                title: error?.data?.message,
                description: (
                  <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">
                      {JSON.stringify(error, null, 2)}
                    </code>
                  </pre>
                ),
              });
            }
          });
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
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Organization Name</FormLabel>
                <FormControl>
                  <Input placeholder="name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="org_username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Organization Unique org_username</FormLabel>
                <FormControl>
                  <Input placeholder="org_username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="items-top flex space-x-2">
            <Checkbox id="create_org_form_term_con" />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="create_org_form_term_con"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Accept terms and conditions
              </label>
            </div>
          </div>
          <Button type="submit" className="w-full">
            {isLoading ? <BarLoader color="#fff" /> : "Create an organization"}
          </Button>
        </form>
      </Form>
    </>
  );
};
