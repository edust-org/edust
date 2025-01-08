import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/utils"

const buttonVariants = cva(
  "eg-inline-flex eg-items-center eg-justify-center eg-gap-2 eg-whitespace-nowrap eg-rounded-md eg-text-sm eg-font-medium eg-transition-colors focus-visible:eg-outline-none focus-visible:eg-ring-1 focus-visible:eg-ring-ring disabled:eg-pointer-events-none disabled:eg-opacity-50 [&_svg]:eg-pointer-events-none [&_svg]:eg-size-4 [&_svg]:eg-shrink-0",
  {
    variants: {
      variant: {
        default:
          "eg-bg-primary eg-text-primary-foreground eg-shadow hover:eg-bg-primary/90",
        destructive:
          "eg-bg-destructive eg-text-destructive-foreground eg-shadow-sm hover:eg-bg-destructive/90",
        outline:
          "eg-border eg-border-input eg-bg-background eg-shadow-sm hover:eg-bg-accent hover:eg-text-accent-foreground",
        secondary:
          "eg-bg-secondary eg-text-secondary-foreground eg-shadow-sm hover:eg-bg-secondary/80",
        ghost: "hover:eg-bg-accent hover:eg-text-accent-foreground",
        link: "eg-text-primary eg-underline-offset-4 hover:eg-underline",
      },
      size: {
        default: "eg-h-9 eg-px-4 eg-py-2",
        sm: "eg-h-8 eg-rounded-md eg-px-3 eg-text-xs",
        lg: "eg-h-10 eg-rounded-md eg-px-8",
        icon: "eg-h-9 eg-w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
