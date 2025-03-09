import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/utils"

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
  const _values = React.useMemo(
    () =>
      Array.isArray(value)
        ? value
        : Array.isArray(defaultValue)
          ? defaultValue
          : [min, max],
    [value, defaultValue, min, max]
  )

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn(
        "eg:relative eg:flex eg:w-full eg:touch-none eg:items-center eg:select-none data-[disabled]:eg:opacity-50 data-[orientation=vertical]:eg:h-full data-[orientation=vertical]:eg:min-h-44 data-[orientation=vertical]:eg:w-auto data-[orientation=vertical]:eg:flex-col",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className={cn(
          "eg:bg-muted eg:relative eg:grow eg:overflow-hidden eg:rounded-full data-[orientation=horizontal]:eg:h-1.5 data-[orientation=horizontal]:eg:w-full data-[orientation=vertical]:eg:h-full data-[orientation=vertical]:eg:w-1.5"
        )}
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className={cn(
            "eg:bg-primary eg:absolute data-[orientation=horizontal]:eg:h-full data-[orientation=vertical]:eg:w-full"
          )}
        />
      </SliderPrimitive.Track>
      {Array.from({ length: _values.length }, (_, index) => (
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          key={index}
          className="eg:border-primary eg:bg-background eg:ring-ring/50 eg:block eg:size-4 eg:shrink-0 eg:rounded-full eg:border eg:shadow-sm eg:transition-[color,box-shadow] hover:eg:ring-4 focus-visible:eg:ring-4 focus-visible:eg:outline-hidden disabled:eg:pointer-events-none disabled:eg:opacity-50"
        />
      ))}
    </SliderPrimitive.Root>
  )
}

export { Slider }
