import { Navbar } from "@/components";
import {
  Button,
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
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
  Typography,
} from "@/components/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { IoAddOutline } from "react-icons/io5";

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
  return (
    <div>
      <header className="border-b">
        <Navbar.Guest />
      </header>
      <section className="container grid grid-cols-[250px_auto] gap-4 py-4 md:gap-6 md:py-8">
        <aside>
          {/* ================================ */}
          <Button size={"icon"} className="mb-4 w-full">
            {" "}
            <IoAddOutline className="mr-2 text-2xl" /> Create an institutes
          </Button>
          {/* ====================================== */}
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
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Shamsul Huda Khan College
                </CardTitle>
                <CardDescription>
                  Shamsul Huda Khan College is an educational establishment that
                  is located at Biddadharpur Moheshpur Jhenaidah...
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Shamsul Huda Khan College
                </CardTitle>
                <CardDescription>
                  Shamsul Huda Khan College is an educational establishment that
                  is located at Biddadharpur Moheshpur Jhenaidah...
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Shamsul Huda Khan College
                </CardTitle>
                <CardDescription>
                  Shamsul Huda Khan College is an educational establishment that
                  is located at Biddadharpur Moheshpur Jhenaidah...
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Shamsul Huda Khan College
                </CardTitle>
                <CardDescription>
                  Shamsul Huda Khan College is an educational establishment that
                  is located at Biddadharpur Moheshpur Jhenaidah...
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
          {/* =========================== */}
          {/* <Card className="mt-5 w-80 p-8">
            <Typography affects="removePaddingMargin" variant="h2">
              Institutes not found{" "}
            </Typography>
            <Typography affects="removePaddingMargin" variant="p">
              If you want to create a new institute you need to register here.
            </Typography>
            <Button className="w-full mt-4">Create new one</Button>
          </Card> */}

          <Card className="max-w-96 mt-5">
            <CardHeader>
              <CardTitle className="text-lg">Institutes not found</CardTitle>
              <CardDescription>
                If you want to create a new institute you need to register here.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button className="w-full">Create new one</Button>
            </CardFooter>
          </Card>
          {/* ========================== */}
        </main>
      </section>
    </div>
  );
};
