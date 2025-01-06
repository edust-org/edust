import { useGetInstitutesCategoriesQuery } from "@/app/api/v0/public"
import { useAppSelector } from "@/app/hooks"
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
} from "@/components/ui"
import { zodResolver } from "@hookform/resolvers/zod"
import { Search } from "lucide-react"
import { useForm } from "react-hook-form"
import { IoAddOutline } from "react-icons/io5"
import { useNavigate } from "react-router-dom"
import { z } from "zod"

const FormSchema = z.object({
  name: z.string(),
  instituteCategoryId: z.string(),
})
const FilterInstitute = ({ query, setQuery }) => {
  const isAuthenticated = useAppSelector(
    (state) => state.authentication.auth.isAuthenticated,
  )

  const navigate = useNavigate()

  const { data } = useGetInstitutesCategoriesQuery({})
  const categories = data?.data?.items || []

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      instituteCategoryId: "",
    },
  })
  function onSubmit(values: z.infer<typeof FormSchema>) {
    const hasValue = Object.entries(values).some((item) => {
      return item[1]
    })

    if (hasValue) {
      setQuery({
        search: {
          name: values.name,
        },
        filter: {
          instituteCategoryId: values.instituteCategoryId,
        },
      })
    }
  }

  return (
    <div>
      <Button
        size={"icon"}
        className="mb-4 w-full"
        onClick={() => {
          if (!isAuthenticated) {
            return navigate("/auth/login")
          }

          navigate("/dashboard/institutes/create")
        }}
      >
        <IoAddOutline className="mr-2 text-2xl" /> Create an institutes
      </Button>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="name"
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
            name="instituteCategoryId"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>A</SelectLabel>
                      {categories?.map(({ id, name, description }: any) => (
                        <SelectItem
                          key={id}
                          title={description}
                          value={id}
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

          {/* <FormField
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
          /> */}

          <div className="flex items-center justify-between gap-2">
            <Button type="submit" className="flex-1">
              Search
            </Button>
            {Boolean(Object.keys(query).length) && (
              <Button
                size={"sm"}
                variant={"ghost"}
                onClick={() => {
                  form.reset()
                  setQuery({})
                }}
              >
                Clear
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  )
}

export default FilterInstitute
