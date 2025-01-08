import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"

import { cn } from "@/utils"

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "eg-peer eg-h-4 eg-w-4 eg-shrink-0 eg-rounded-sm eg-border eg-border-primary eg-shadow focus-visible:eg-outline-none focus-visible:eg-ring-1 focus-visible:eg-ring-ring disabled:eg-cursor-not-allowed disabled:eg-opacity-50 data-[state=checked]:eg-bg-primary data-[state=checked]:eg-text-primary-foreground",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("eg-flex eg-items-center eg-justify-center eg-text-current")}
    >
      <Check className="eg-h-4 eg-w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
