"use client"

import { defaultValues } from "@/configs"
import axios from "@/lib/axios"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@edust/ui"
import { Typography } from "@edust/ui"
import { cn } from "@edust/ui/utils"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "next/navigation"

import Loading from "./loading"

export default function FeedbackDetails() {
  const params = useParams<{ feedbackId: string }>()

  const { isPending, error, data } = useQuery({
    queryKey: ["feedbackDetailsData"],
    queryFn: async () =>
      await axios.get(
        `${defaultValues.backendURL}/api/v0/administrator/feedback/${params.feedbackId}`,
      ),
  })

  const info = data?.data?.data

  if (isPending) return <Loading />

  if (error) return "An error has occurred: " + error.message

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
