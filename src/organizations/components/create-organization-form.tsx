import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ReactElement } from "react";

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
import { useNavigate } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Enter your Organization name",
  }),
  username: z.string().min(2, {
    message: "Enter your Organization name",
  }),
});

interface Props {
  children: ReactElement<HTMLButtonElement>;
  forPage?: boolean;
}

export const CreateOrganizationForm: React.FC<Props> = ({
  children,
  forPage = false,
}) => {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      username: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);

    // redirect home route
    navigate("/", { replace: true });
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
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Organization Unique username</FormLabel>
                <FormControl>
                  <Input placeholder="username" {...field} />
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
          <div
            className={`${
              forPage && "flex-col-reverse"
            } flex items-center justify-end gap-4`}
          >
            {children}
            {/* TODO: This button will be enable and disable base on auth sign in or not */}
            <Button type="submit" disabled={forPage}>
              Create an organization
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
