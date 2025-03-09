import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/utils"

const buttonVariants = cva(
  "eg:inline-flex eg:items-center eg:justify-center eg:gap-2 eg:whitespace-nowrap eg:rounded-md eg:text-sm eg:font-medium eg:transition-[color,box-shadow] disabled:eg:pointer-events-none disabled:eg:opacity-50 [&_svg]:eg:pointer-events-none [&_svg:not([class*=size-])]:eg:size-4 eg:shrink-0 [&_svg]:eg:shrink-0 eg:outline-none focus-visible:eg:border-ring focus-visible:eg:ring-ring/50 focus-visible:eg:ring-[3px] aria-invalid:eg:ring-destructive/20 dark:aria-invalid:eg:ring-destructive/40 aria-invalid:eg:border-destructive",
  {
    variants: {
      variant: {
        default:
          "eg:bg-primary eg:text-primary-foreground eg:shadow-xs hover:eg:bg-primary/90",
        destructive:
          "eg:bg-destructive eg:text-white eg:shadow-xs hover:eg:bg-destructive/90 focus-visible:eg:ring-destructive/20 dark:focus-visible:eg:ring-destructive/40",
        outline:
          "eg:border eg:border-input eg:bg-background eg:shadow-xs hover:eg:bg-accent hover:eg:text-accent-foreground",
        secondary:
          "eg:bg-secondary eg:text-secondary-foreground eg:shadow-xs hover:eg:bg-secondary/80",
        ghost: "hover:eg:bg-accent hover:eg:text-accent-foreground",
        link: "eg:text-primary eg:underline-offset-4 hover:eg:underline",
      },
      size: {
        default: "eg:h-9 eg:px-4 eg:py-2 has-[>svg]:eg:px-3",
        sm: "eg:h-8 eg:rounded-md eg:gap-1.5 eg:px-3 has-[>svg]:eg:px-2.5",
        lg: "eg:h-10 eg:rounded-md eg:px-6 has-[>svg]:eg:px-4",
        icon: "eg:size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
