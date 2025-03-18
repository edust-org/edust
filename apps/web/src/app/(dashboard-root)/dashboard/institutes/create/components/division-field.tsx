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
import { useGetBDDivisionsQuery } from "@/lib/store/api/_others/bdapis"
import { cn } from "@/utils"
import { Check, ChevronsUpDown } from "lucide-react"

import { useMemo } from "react"

export const DivisionField = ({ form }) => {
  const { data, isLoading } = useGetBDDivisionsQuery()

  const division = useMemo(() => {
    if (data) {
      return [...data].sort().map((div) => ({
        label: div,
        value: div,
      }))
    }
    // if data not found
    return [{ label: "Dhaka", value: "Dhaka" }]
  }, [data])

  if (isLoading) {
    return <Skeleton className="h-9 w-full rounded" />
  }

  return (
    <FormField
      control={form.control}
      name="division"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>
            division <span className="text-destructive">*</span>
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
                    ? division.find((div) => div.value === field.value)?.label
                    : "Select division"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="p-0">
              <Command>
                <CommandInput placeholder="Search division..." />
                <CommandList>
                  <CommandEmpty>No division found.</CommandEmpty>
                  <CommandGroup>
                    {division.map((div) => (
                      <CommandItem
                        value={div.label}
                        key={div.value}
                        onSelect={() => {
                          form.setValue("division", div.value)
                        }}
                      >
                        {div.label}
                        <Check
                          className={cn(
                            "ml-auto",
                            div.value === field.value
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
            Select the division where the institute is located.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
