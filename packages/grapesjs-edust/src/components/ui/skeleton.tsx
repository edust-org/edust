import { cn } from "@/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("eg-animate-pulse eg-rounded-md eg-bg-primary/10", className)}
      {...props}
    />
  )
}

export { Skeleton }
