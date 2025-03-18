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
import { useGetBDDistrictsQuery } from "@/lib/store/api/_others/bdapis"
import { cn } from "@/utils"
import { Check, ChevronsUpDown } from "lucide-react"

import { useMemo } from "react"

export const DistrictField = ({ form }) => {
  const { data, isLoading } = useGetBDDistrictsQuery()

  const district = useMemo(() => {
    if (data) {
      return [...data].sort().map((dis) => ({
        label: dis,
        value: dis,
      }))
    }
    // if data not found
    return []
  }, [data])

  if (isLoading) {
    return <Skeleton className="h-9 w-full rounded" />
  }

  return (
    <FormField
      control={form.control}
      name="district"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>
            district <span className="text-destructive">*</span>
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
                    ? district.find((dis) => dis.value === field.value)?.label
                    : "Select district"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="p-0">
              <Command>
                <CommandInput placeholder="Search district..." />
                <CommandList>
                  <CommandEmpty>No district found.</CommandEmpty>
                  <CommandGroup>
                    {district.map((dis) => (
                      <CommandItem
                        value={dis.label}
                        key={dis.value}
                        onSelect={() => {
                          form.setValue("district", dis.value)
                        }}
                      >
                        {dis.label}
                        <Check
                          className={cn(
                            "ml-auto",
                            dis.value === field.value
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
            Select the district where the institute is located.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
