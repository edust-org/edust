import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/utils"

const badgeVariants = cva(
  "eg-inline-flex eg-items-center eg-rounded-md eg-border eg-px-2.5 eg-py-0.5 eg-text-xs eg-font-semibold eg-transition-colors focus:eg-outline-none focus:eg-ring-2 focus:eg-ring-ring focus:eg-ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "eg-border-transparent eg-bg-primary eg-text-primary-foreground eg-shadow hover:eg-bg-primary/80",
        secondary:
          "eg-border-transparent eg-bg-secondary eg-text-secondary-foreground hover:eg-bg-secondary/80",
        destructive:
          "eg-border-transparent eg-bg-destructive eg-text-destructive-foreground eg-shadow hover:eg-bg-destructive/80",
        outline: "eg-text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
