import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { CircleIcon } from "lucide-react"

import { cn } from "@/utils"

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn("eg:grid eg:gap-3", className)}
      {...props}
    />
  )
}

function RadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        "eg:border-input eg:text-primary focus-visible:eg:border-ring focus-visible:eg:ring-ring/50 aria-invalid:eg:ring-destructive/20 dark:aria-invalid:eg:ring-destructive/40 aria-invalid:eg:border-destructive eg:aspect-square eg:size-4 eg:shrink-0 eg:rounded-full eg:border eg:shadow-xs eg:transition-[color,box-shadow] eg:outline-none focus-visible:eg:ring-[3px] disabled:eg:cursor-not-allowed disabled:eg:opacity-50",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="eg:relative eg:flex eg:items-center eg:justify-center"
      >
        <CircleIcon className="eg:fill-primary eg:absolute eg:top-1/2 eg:left-1/2 eg:size-2 eg:-translate-x-1/2 eg:-translate-y-1/2" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
}

export { RadioGroup, RadioGroupItem }
