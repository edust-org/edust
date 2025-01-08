import * as React from "react"

import { cn } from "@/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "eg-flex eg-h-9 eg-w-full eg-rounded-md eg-border eg-border-input eg-bg-transparent eg-px-3 eg-py-1 eg-text-base eg-shadow-sm eg-transition-colors file:eg-border-0 file:eg-bg-transparent file:eg-text-sm file:eg-font-medium file:eg-text-foreground placeholder:eg-text-muted-foreground focus-visible:eg-outline-none focus-visible:eg-ring-1 focus-visible:eg-ring-ring disabled:eg-cursor-not-allowed disabled:eg-opacity-50 md:eg-text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
