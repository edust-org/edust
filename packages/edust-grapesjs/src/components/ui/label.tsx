import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"

import { cn } from "@/utils"

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "eg:flex eg:items-center eg:gap-2 eg:text-sm eg:leading-none eg:font-medium eg:select-none group-data-[disabled=true]:eg:pointer-events-none group-data-[disabled=true]:eg:opacity-50 peer-disabled:eg:cursor-not-allowed peer-disabled:eg:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Label }
