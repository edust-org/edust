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
import { useGetBDSubDistrictByDistrict } from "@/hooks/react-query"
import { cn } from "@/utils"
import { Check, ChevronsUpDown } from "lucide-react"

import { useMemo } from "react"

export const SubDistrictField = ({ form, district: queryDistrict }) => {
  const { data, isLoading } = useGetBDSubDistrictByDistrict(queryDistrict)

  const subDistrict = useMemo(() => {
    if (data) {
      return [...data].sort().map((subDis) => ({
        label: subDis,
        value: subDis,
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
      name="subDistrict"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>
            subDistrict <span className="text-destructive">*</span>
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
                    ? subDistrict.find((subDis) => subDis.value === field.value)
                        ?.label
                    : "Select subDistrict"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="p-0">
              <Command>
                <CommandInput placeholder="Search subDistrict..." />
                <CommandList>
                  <CommandEmpty>No subDistrict found.</CommandEmpty>
                  <CommandGroup>
                    {subDistrict.map((subDis) => (
                      <CommandItem
                        value={subDis.label}
                        key={subDis.value}
                        onSelect={() => {
                          form.setValue("subDistrict", subDis.value)
                        }}
                      >
                        {subDis.label}
                        <Check
                          className={cn(
                            "ml-auto",
                            subDis.value === field.value
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
            Select the subDistrict where the institute is located.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
