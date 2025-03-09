import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/utils"

const badgeVariants = cva(
  "eg:inline-flex eg:items-center eg:justify-center eg:rounded-md eg:border eg:px-2 eg:py-0.5 eg:text-xs eg:font-medium eg:w-fit eg:whitespace-nowrap eg:shrink-0 [&>svg]:eg:size-3 eg:gap-1 [&>svg]:eg:pointer-events-none focus-visible:eg:border-ring focus-visible:eg:ring-ring/50 focus-visible:eg:ring-[3px] aria-invalid:eg:ring-destructive/20 dark:aria-invalid:eg:ring-destructive/40 aria-invalid:eg:border-destructive eg:transition-[color,box-shadow] eg:overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "eg:border-transparent eg:bg-primary eg:text-primary-foreground [a&]:hover:eg:bg-primary/90",
        secondary:
          "eg:border-transparent eg:bg-secondary eg:text-secondary-foreground [a&]:hover:eg:bg-secondary/90",
        destructive:
          "eg:border-transparent eg:bg-destructive eg:text-white [a&]:hover:eg:bg-destructive/90 focus-visible:eg:ring-destructive/20 dark:focus-visible:eg:ring-destructive/40",
        outline:
          "eg:text-foreground [a&]:hover:eg:bg-accent [a&]:hover:eg:text-accent-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
