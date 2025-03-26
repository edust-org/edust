"use client"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Skeleton,
} from "@/components/ui"
import { cn } from "@/utils"

export default function Loading() {
  return (
    <>
   
          <Card className={cn("w-[380px]")}>
            <CardHeader>
              <Skeleton className="mt-2 h-6 w-3/4" />
              <Skeleton className="mt-1 h-4 w-1/2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="mt-2 h-4 w-full" />
              <Skeleton className="mt-2 h-4 w-3/4" />
              <Skeleton className="mt-2 h-4 w-2/3" />
              <Skeleton className="mt-2 h-4 w-1/2" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-4 w-1/3" />
            </CardFooter>
          </Card>
       
    </>
  )
}
