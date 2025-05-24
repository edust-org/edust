import { useGetInstitutesCategories } from "@/hooks/react-query"
import {
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Skeleton,
  Typography,
} from "@edust/ui"
import { cn } from "@edust/ui/utils"
import { Check, ChevronsUpDown } from "lucide-react"
import Link from "next/link"

import { useReducer } from "react"

import categoryOptionsReducer from "../category-options-reducer"

export const CategoriesField = ({ form }) => {
  const [categoryOptionState, categoryOptionDispatch] = useReducer(
    categoryOptionsReducer.reducer,
    categoryOptionsReducer.initialState,
  )

  const handleCategoriesSearchChange = (value: string) => {
    categoryOptionDispatch({
      type: categoryOptionsReducer.ActionTypes.ENABLE_IS_SEARCHING,
    })

    if (categoryOptionState.searchTimeout) {
      clearTimeout(categoryOptionState.searchTimeout)
    }

    const timeout = window.setTimeout(() => {
      categoryOptionDispatch({
        type: categoryOptionsReducer.ActionTypes.SET_QUERY_NAME,
        name: value,
      })
      categoryOptionDispatch({
        type: categoryOptionsReducer.ActionTypes.DISENABLE_IS_SEARCHING,
      })
    }, 500) // delay of 500ms

    categoryOptionDispatch({
      type: categoryOptionsReducer.ActionTypes.SET_SEARCH_TIMEOUT,
      searchTimeout: timeout,
    })
  }

  const query = categoryOptionState.query.name
    ? categoryOptionState.query
    : { name: form.getValues("instituteCategory") }

  const { data: categoriesData, isFetching: isCategoriesLoading } =
    useGetInstitutesCategories(query)

  const categories =
    categoriesData?.data?.items?.map((category) => ({
      label: category?.name,
      value: category.id,
    })) || []

  return (
    <FormField
      control={form.control}
      name="instituteCategoryId"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>
            Categories <span className="text-destructive">*</span>
          </FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "justify-between",
                    !field.value && "text-muted-foreground",
                  )}
                  {...field}
                >
                  {field.value
                    ? categories.find(
                        (category) => category.value === field.value,
                      )?.label
                    : "Select category"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="p-0">
              <Command>
                <CommandInput
                  placeholder="Search category..."
                  onValueChange={(v) => handleCategoriesSearchChange(v)}
                />
                <CommandList>
                  <CommandEmpty>
                    {isCategoriesLoading || categoryOptionState.isSearching ? (
                      <>
                        <Skeleton className="mx-auto mb-2 h-8 w-[calc(100%-10px)]" />
                        <Skeleton className="mx-auto h-8 w-[calc(100%-10px)]" />
                      </>
                    ) : (
                      <div>
                        <Typography>No category found.</Typography>
                        <Link href={"/contact-us"}>
                          <Button variant={"link"}>
                            Request to create new one
                          </Button>
                        </Link>
                      </div>
                    )}
                  </CommandEmpty>
                  <CommandGroup>
                    {categories.map((category) => (
                      <CommandItem
                        value={category.label}
                        key={category.value}
                        onSelect={() => {
                          form.setValue("instituteCategoryId", category.value)
                        }}
                      >
                        {category.label}
                        <Check
                          className={cn(
                            "ml-auto",
                            category.value === field.value
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormDescription>
            Select the category that best describes the type of institute.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
