import { useGetInstitutesCategoriesQuery } from "@/app/api/v0/public";
import {
  Button,
  Form,
  FormField,
  FormItem,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import { useForm } from "react-hook-form";
import { IoAddOutline } from "react-icons/io5";
import { z } from "zod";

const FormSchema = z.object({
  institute_name: z.string(),
  institute_type: z.string(),
  board: z.string(),
  eiin: z.string(),
});
const FilterInstitute = () => {
  const { data: { data: categories } = {} } = useGetInstitutesCategoriesQuery(
    {},
  );
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      institute_name: "",
      institute_type: "",
      board: "",
      eiin: "",
    },
  });
  function onSubmit(values: z.infer<typeof FormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div>
      <Button size={"icon"} className="mb-4 w-full">
        {" "}
        <IoAddOutline className="mr-2 text-2xl" /> Create an institutes
      </Button>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="institute_name"
            render={({ field }) => (
              <FormItem>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search" className="pl-8" {...field} />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="institute_type"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Type of institutes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Institute Types</SelectLabel>

                      {categories?.items?.map(({ name, description }: any) => (
                        <SelectItem
                          title={description}
                          value={name}
                          className="capitalize"
                        >
                          {name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="board"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Boards" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Boards</SelectLabel>
                      <SelectItem value="est">
                        Eastern Standard Time (EST)
                      </SelectItem>
                      <SelectItem value="cst">
                        Central Standard Time (CST)
                      </SelectItem>
                      <SelectItem value="mst">
                        Mountain Standard Time (MST)
                      </SelectItem>
                      <SelectItem value="pst">
                        Pacific Standard Time (PST)
                      </SelectItem>
                      <SelectItem value="akst">
                        Alaska Standard Time (AKST)
                      </SelectItem>
                      <SelectItem value="hst">
                        Hawaii Standard Time (HST)
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="eiin"
            render={({ field }) => (
              <FormItem>
                <Input type="number" placeholder="EIIN" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Search
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default FilterInstitute;
