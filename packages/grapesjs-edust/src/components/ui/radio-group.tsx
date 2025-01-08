import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { Circle } from "lucide-react"

import { cn } from "@/utils"

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("eg-grid eg-gap-2", className)}
      {...props}
      ref={ref}
    />
  )
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "eg-aspect-square eg-h-4 eg-w-4 eg-rounded-full eg-border eg-border-primary eg-text-primary eg-shadow focus:eg-outline-none focus-visible:eg-ring-1 focus-visible:eg-ring-ring disabled:eg-cursor-not-allowed disabled:eg-opacity-50",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="eg-flex eg-items-center eg-justify-center">
        <Circle className="eg-h-3.5 eg-w-3.5 eg-fill-primary" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }
