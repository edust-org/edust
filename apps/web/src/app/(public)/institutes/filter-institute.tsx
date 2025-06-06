"use client"

import { useGetInstitutesCategories } from "@/hooks/react-query"
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
} from "@edust/ui"
import { zodResolver } from "@hookform/resolvers/zod"
import { Search } from "lucide-react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { IoAddOutline } from "react-icons/io5"
import { z } from "zod"

import React from "react"

import { useGetInstitutesStore } from "./store/use-institutes-store"

const FormSchema = z.object({
  name: z.string(),
  instituteCategoryId: z.string(),
})
const FilterInstitute = ({ isDetailsPage = false }) => {
  const stateInstituteFilter = useGetInstitutesStore()

  const isAuthenticated = useSession().status === "authenticated"

  const router = useRouter()

  const { data } = useGetInstitutesCategories({ limit: 500 })
  const categoriesData = data?.data?.items || []

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: stateInstituteFilter.name,
      instituteCategoryId: stateInstituteFilter.instituteCategoryId,
    },
  })
  function onSubmit(values: z.infer<typeof FormSchema>) {
    const hasValue = Object.entries(values).some((item) => {
      return item[1]
    })

    if (hasValue) {
      stateInstituteFilter.institutesFiltering({
        name: values.name,
        instituteCategoryId: values.instituteCategoryId,
      })

      if (isDetailsPage) {
        router.push("/institutes")
      }
    }
  }

  const grouped = categoriesData.reduce((acc, item) => {
    // Get the first letter of the name to group by
    const firstChar = item.name.charAt(0).toLowerCase()

    // Check if the group already exists, if not, create it
    if (!acc[firstChar]) {
      acc[firstChar] = { recentChar: firstChar, categories: [] }
    }

    // Push the item into the corresponding group
    acc[firstChar].categories.push({
      id: item.id,
      name: item.name,
    })

    return acc
  }, {})

  const categories = Object.values(grouped).map((group) => ({
    [group.recentChar]: group.recentChar,
    categories: group.categories,
  }))

  return (
    <div>
      {!isAuthenticated && (
        <Button
          size={"icon"}
          className="mb-4 w-full"
          onClick={() => {
            if (!isAuthenticated) {
              return router.push("/auth/login")
            }

            router.push("/dashboard/institutes/create")
          }}
        >
          <IoAddOutline className="mr-2 text-2xl" /> Create an institutes
        </Button>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <div className="relative">
                  <Search className="text-muted-foreground absolute left-2 top-2.5 h-4 w-4" />
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
                  value={form.getValues().instituteCategoryId}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {categories.map((item) => {
                        const { categories, ...alpha } = item
                        const key = Object.entries(alpha)[0][0]
                        return (
                          <React.Fragment key={key}>
                            <SelectLabel>{key.toUpperCase()}</SelectLabel>
                            {categories?.map(
                              ({ id, name, description }: any) => (
                                <SelectItem
                                  key={id}
                                  title={description}
                                  value={id}
                                  className="capitalize"
                                >
                                  {name}
                                </SelectItem>
                              ),
                            )}
                          </React.Fragment>
                        )
                      })}
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

            {Object.values(stateInstituteFilter).some((i) => i !== "") && (
              <Button
                size={"sm"}
                variant={"ghost"}
                onClick={() => {
                  form.reset()

                  // when i are in details page rest not work so that is way we set ""
                  form.setValue("name", "")
                  form.setValue("instituteCategoryId", "")

                  stateInstituteFilter.resetInstitutesFiltering()
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
