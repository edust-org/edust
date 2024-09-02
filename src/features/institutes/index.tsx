import { Navbar } from "@/components";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Form,
  FormItem,
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
import { z } from "zod";

const FormSchema = z.object({
  institute_name: z.string(),
  institute_type: z.string(),
  board: z.string(),
  eiin: z.number(),
});

export const Institutes = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      institute_name: "",
      institute_type: "",
      board: "",
      eiin: 0,
    },
  });

  return (
    <div>
      <header className="border-b">
        <Navbar.Guest />
      </header>
      <section className="container grid grid-cols-[250px_auto] gap-4 py-4 md:gap-6 md:py-8">
        <aside>
          <Form {...form}>
            <form className="space-y-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search" className="pl-8" />
              </div>

              <Select>
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

              <Select>
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

              <FormItem>
                <Input type="number" placeholder="EIIN" />
              </FormItem>
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
        </main>
      </section>
    </div>
  );
};
