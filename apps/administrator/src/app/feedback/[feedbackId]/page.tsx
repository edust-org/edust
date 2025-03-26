"use client"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Typography,
} from "@/components/ui"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { defaultValues } from "@/configs"
import axios from "@/lib/axios"
import { cn } from "@/utils"
import { useQuery } from "@tanstack/react-query"
import Link from "next/link"
import { useParams } from "next/navigation"

import Loading from "./loading"

export default function FeedbackDetails() {
  const params = useParams<{ feedbackId: string }>()

  const { isPending, error, data } = useQuery({
    queryKey: ["instituteDetailsData"],
    queryFn: async () =>
      await axios.get(
        `${defaultValues.backendURL}/api/v0/administrator/feedback/${params.feedbackId}`,
      ),
  })

  const info = data?.data?.data

  if (isPending) return <Loading />

  if (error) return "An error has occurred: " + error.message

  // {
  //     "id": "6c52e534-a6d4-414c-bd1a-6bd96820f100",
  //     "rating": 4,
  //     "userId": "b4bb02cc-7da5-4b2b-b842-48b0d1a5f886",
  //     "improvementAreas": [
  //         "perferendis",
  //         "tener",
  //         "aliquid"
  //     ],
  //     "comments": "Accusamus blanditiis ubi.",
  //     "status": "DRAFT",
  //     "createdAt": "1993-07-08T14:13:55.908Z",
  //     "updatedAt": "1993-07-08T14:13:55.908Z"
  // }
  return (
    <>
      <Card className={cn("w-[380px]")}>
        <CardHeader>
          <CardTitle>Comments: {info.comments}</CardTitle>
          <CardDescription>Category: {info.status}</CardDescription>
        </CardHeader>
        <CardContent>
          <Typography>Slug: {info.improvementAreas} </Typography>
          <Typography>Email: {info.rating} </Typography>
        </CardContent>
      </Card>
    </>
  )
}
