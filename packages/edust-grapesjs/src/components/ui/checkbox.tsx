import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { CheckIcon } from "lucide-react"

import { cn } from "@/utils"

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "eg:peer eg:border-input data-[state=checked]:eg:bg-primary data-[state=checked]:eg:text-primary-foreground data-[state=checked]:eg:border-primary focus-visible:eg:border-ring focus-visible:eg:ring-ring/50 aria-invalid:eg:ring-destructive/20 dark:aria-invalid:eg:ring-destructive/40 aria-invalid:eg:border-destructive eg:size-4 eg:shrink-0 eg:rounded-[4px] eg:border eg:shadow-xs eg:transition-shadow eg:outline-none focus-visible:eg:ring-[3px] disabled:eg:cursor-not-allowed disabled:eg:opacity-50",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="eg:flex eg:items-center eg:justify-center eg:text-current eg:transition-none"
      >
        <CheckIcon className="eg:size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
