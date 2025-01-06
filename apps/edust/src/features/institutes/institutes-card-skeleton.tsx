import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Card,
  CardContent,
  CardFooter,
  CardTitle,
  Skeleton,
} from "@/components/ui"
import { Link } from "react-router-dom"

export const InstitutesCardSkeleton = () => {
  return (
    <>
      <Card className="overflow-hidden rounded-lg border shadow">
        <Skeleton className="h-48" />
        <CardContent className="p-4">
          {/* Badge */}
          <Skeleton className="h-6 w-28 rounded-full" />
          {/* Title */}
          <CardTitle className="my-3 hover:underline">
            <Skeleton className="h-10" />
          </CardTitle>
          {/* Icons */}
          <div className="mt-5 flex justify-between text-xl text-slate-700 sm:text-2xl">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        </CardContent>

        <CardFooter className="flex items-center justify-between p-4">
          <div className="flex flex-1 items-center gap-2">
            <Skeleton className="h-11 w-11 rounded-full" />
            <div>
              <Skeleton className="mb-2 h-4 w-20 rounded-full" />
              <Skeleton className="h-3 w-24 rounded-full" />
            </div>
          </div>

          <Skeleton className="h-6 w-9 rounded" />
        </CardFooter>
      </Card>
    </>
  )
}
