import { Navbar } from "@/components";
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
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { IoAddOutline } from "react-icons/io5";
import { InstitutesCard } from "./institutes-card";
import InstituteNotFound from "./institutes-not-found";
import {
  useGetInstitutesCategoriesQuery,
  useGetInstitutesQuery,
} from "@/app/api/v0/public";
import { Helmet } from "react-helmet-async";

const FormSchema = z.object({
  institute_name: z.string(),
  institute_type: z.string(),
  board: z.string(),
  eiin: z.string(),
});

export const Institutes = () => {
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

  const { data: { data } = {}, error, isLoading } = useGetInstitutesQuery({});
  const { data: { data: categories } = {} } = useGetInstitutesCategoriesQuery(
    {},
  );

  return (
    <div>
       <Helmet>
        <meta name="description" content="Welcome to Edust, a design platform for creating engaging and beautiful educational content." />
        <title>Institute | Welcome to here</title>
        
      </Helmet>
      <header className="sticky top-0 z-50 border-b bg-white/30 backdrop-blur-3xl">
        <Navbar.Guest />
      </header>
      <section className="container grid gap-4 py-4 sm:grid-cols-[250px_auto] md:gap-6 md:py-8">
        <aside>
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

                          {categories?.items?.map(
                            ({ name, description }: any) => (
                              <SelectItem
                                title={description}
                                value={name}
                                className="capitalize"
                              >
                                {name}
                              </SelectItem>
                            ),
                          )}
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
        </aside>

        <main>
          {isLoading ? (
            <AiOutlineLoading3Quarters className="size-6 animate-spin" />
          ) : data.items.length ? (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {data?.items?.map((item: any) => (
                <InstitutesCard key={item?.id} item={item} />
              ))}
            </div>
          ) : (
            <InstituteNotFound />
          )}
        </main>
      </section>
    </div>
  );
};
