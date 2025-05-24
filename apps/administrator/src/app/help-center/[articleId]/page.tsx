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

export default function HelpCenterDetails() {
  const params = useParams<{ articleId: string }>()

  const { isPending, error, data } = useQuery({
    queryKey: ["helpCenterDetailsData"],
    queryFn: async () =>
      await axios.get(
        `${defaultValues.backendURL}/api/v0/administrator/help-center/${params.articleId}`,
      ),
  })

  const info = data?.data?.data

  if (isPending) return <Loading />

  if (error) return "An error has occurred: " + error.message

  return (
    <>
      <Card className={cn("w-[380px]")}>
        <CardHeader>
          <CardTitle>Title: {info.title}</CardTitle>
          <CardDescription>Slug: {info.slug}</CardDescription>
        </CardHeader>
        <CardContent>
          <Typography>Status: {info.status} </Typography>
          <Typography>createdAt: {info.createdAt} </Typography>
        </CardContent>
      </Card>
    </>
  )
}
