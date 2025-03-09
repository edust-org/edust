"use client"

import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/utils"

const toggleVariants = cva(
  "eg:inline-flex eg:items-center eg:justify-center eg:gap-2 eg:rounded-md eg:text-sm eg:font-medium hover:eg:bg-muted hover:eg:text-muted-foreground disabled:eg:pointer-events-none disabled:eg:opacity-50 data-[state=on]:eg:bg-accent data-[state=on]:eg:text-accent-foreground [&_svg]:eg:pointer-events-none [&_svg:not([class*=size-])]:eg:size-4 [&_svg]:eg:shrink-0 focus-visible:eg:border-ring focus-visible:eg:ring-ring/50 focus-visible:eg:ring-[3px] eg:outline-none eg:transition-[color,box-shadow] aria-invalid:eg:ring-destructive/20 dark:aria-invalid:eg:ring-destructive/40 aria-invalid:eg:border-destructive eg:whitespace-nowrap",
  {
    variants: {
      variant: {
        default: "eg:bg-transparent",
        outline:
          "eg:border eg:border-input eg:bg-transparent eg:shadow-xs hover:eg:bg-accent hover:eg:text-accent-foreground",
      },
      size: {
        default: "eg:h-9 eg:px-2 eg:min-w-9",
        sm: "eg:h-8 eg:px-1.5 eg:min-w-8",
        lg: "eg:h-10 eg:px-2.5 eg:min-w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Toggle({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Toggle, toggleVariants }
