import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "eg-relative eg-flex eg-w-full eg-touch-none eg-select-none eg-items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="eg-relative eg-h-1.5 eg-w-full eg-grow eg-overflow-hidden eg-rounded-full eg-bg-primary/20">
      <SliderPrimitive.Range className="eg-absolute eg-h-full eg-bg-primary" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="eg-block eg-h-4 eg-w-4 eg-rounded-full eg-border eg-border-primary/50 eg-bg-background eg-shadow eg-transition-colors focus-visible:eg-outline-none focus-visible:eg-ring-1 focus-visible:eg-ring-ring disabled:eg-pointer-events-none disabled:eg-opacity-50" />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
