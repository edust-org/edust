import * as React from "react"

import { cn } from "@/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "eg:border-input file:eg:text-foreground placeholder:eg:text-muted-foreground selection:eg:bg-primary selection:eg:text-primary-foreground eg:flex eg:h-9 eg:w-full eg:min-w-0 eg:rounded-md eg:border eg:bg-transparent eg:px-3 eg:py-1 eg:text-base eg:shadow-xs eg:transition-[color,box-shadow] eg:outline-none file:eg:inline-flex file:eg:h-7 file:eg:border-0 file:eg:bg-transparent file:eg:text-sm file:eg:font-medium disabled:eg:pointer-events-none disabled:eg:cursor-not-allowed disabled:eg:opacity-50 md:eg:text-sm",
        "focus-visible:eg:border-ring focus-visible:eg:ring-ring/50 focus-visible:eg:ring-[3px]",
        "aria-invalid:eg:ring-destructive/20 dark:aria-invalid:eg:ring-destructive/40 aria-invalid:eg:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Input }
