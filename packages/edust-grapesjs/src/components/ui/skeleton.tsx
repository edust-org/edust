import { cn } from "@/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("eg:bg-primary/10 eg:animate-pulse eg:rounded-md", className)}
      {...props}
    />
  )
}

export { Skeleton }
