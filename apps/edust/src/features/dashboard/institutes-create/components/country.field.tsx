import { useGetCountriesQuery } from "@/app/api/_others/restcountries"
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
} from "@/components/ui"
import { cn } from "@/utils"
import { Check, ChevronsUpDown } from "lucide-react"
import { useMemo } from "react"

export const CountryField = ({ form }) => {
  const { data, isLoading } = useGetCountriesQuery()

  const countries = useMemo(() => {
    if (data) {
      return [...data].sort().map((country) => ({
        label: country,
        value: country,
      }))
    }
    // if data not found
    return [
      { label: "Afghanistan", value: "Afghanistan" },
      { label: "Bangladesh", value: "Bangladesh" },
      { label: "Bhutan", value: "Bhutan" },
      { label: "China", value: "China" },
      { label: "India", value: "India" },
      { label: "Maldives", value: "Maldives" },
      { label: "Myanmar", value: "Myanmar" },
      { label: "Nepal", value: "Nepal" },
      { label: "Pakistan", value: "Pakistan" },
      { label: "Sri Lanka", value: "Sri Lanka" },
      { label: "Thailand", value: "Thailand" },
    ]
  }, [data])

  if (isLoading) {
    return <Skeleton className="h-9 w-full rounded" />
  }

  return (
    <FormField
      control={form.control}
      name="country"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>
            country <span className="text-destructive">*</span>
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
                >
                  {field.value
                    ? countries.find((country) => country.value === field.value)
                        ?.label
                    : "Select country"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="p-0">
              <Command>
                <CommandInput placeholder="Search country..." />
                <CommandList>
                  <CommandEmpty>No country found.</CommandEmpty>
                  <CommandGroup>
                    {countries.map((country) => (
                      <CommandItem
                        value={country.label}
                        key={country.value}
                        onSelect={() => {
                          form.setValue("country", country.value)
                        }}
                      >
                        {country.label}
                        <Check
                          className={cn(
                            "ml-auto",
                            country.value === field.value
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
            Select the country where the institute is located.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
