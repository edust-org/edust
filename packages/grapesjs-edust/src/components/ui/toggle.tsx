"use client"

import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/utils"

const toggleVariants = cva(
  "eg-inline-flex eg-items-center eg-justify-center eg-gap-2 eg-rounded-md eg-text-sm eg-font-medium eg-transition-colors hover:eg-bg-muted hover:eg-text-muted-foreground focus-visible:eg-outline-none focus-visible:eg-ring-1 focus-visible:eg-ring-ring disabled:eg-pointer-events-none disabled:eg-opacity-50 data-[state=on]:eg-bg-accent data-[state=on]:eg-text-accent-foreground [&_svg]:eg-pointer-events-none [&_svg]:eg-size-4 [&_svg]:eg-shrink-0",
  {
    variants: {
      variant: {
        default: "eg-bg-transparent",
        outline:
          "eg-border eg-border-input eg-bg-transparent eg-shadow-sm hover:eg-bg-accent hover:eg-text-accent-foreground",
      },
      size: {
        default: "eg-h-9 eg-px-2 eg-min-w-9",
        sm: "eg-h-8 eg-px-1.5 eg-min-w-8",
        lg: "eg-h-10 eg-px-2.5 eg-min-w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size, className }))}
    {...props}
  />
))

Toggle.displayName = TogglePrimitive.Root.displayName

export { Toggle, toggleVariants }
