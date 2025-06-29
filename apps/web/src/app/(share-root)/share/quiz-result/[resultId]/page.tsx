"use client"

import { useGetQuizResultByResultToken } from "@/hooks/react-query"
import { Card, CardContent, CardHeader, CardTitle, Typography } from "@edust/ui"
import { compareAsc, format } from "date-fns"
import { useParams } from "next/navigation"

import React from "react"

export default function ShareQuizResultPage() {
  const { resultId } = useParams<{ resultId: string }>()

  const { data, isLoading } = useGetQuizResultByResultToken(resultId)
  console.log(data?.data.submittedAt)

  return (
    <>
      {isLoading ? <Typography variant="h2">Loading...</Typography> : null}
      <Card className="mx-auto mt-10 max-w-2xl">
        <CardHeader className="flex w-full flex-col items-center justify-center">
          <CardTitle className="font-semibold md:text-2xl lg:text-3xl">
            Quiz Result
          </CardTitle>
          <CardTitle>{data?.data.title}</CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col md:gap-y-1 lg:gap-y-2 xl:gap-y-3">
          <Typography affects="removePaddingMargin">
            <strong>Title:</strong> {data?.data.title}
          </Typography>

          <Typography affects="removePaddingMargin">
            <strong>MaxPoints:</strong>
            {data?.data.maxPoints}
          </Typography>

          <Typography affects="removePaddingMargin">
            <strong>EarnedPoints:</strong> {data?.data.earnedPoints}
          </Typography>

          <Typography affects="removePaddingMargin">
            <strong>Status:</strong> {data?.data.status}
          </Typography>
          
          <Typography affects="removePaddingMargin">
            <strong>SubmittedAt:</strong>{" "}
            {data?.data?.submittedAt
              ? format(new Date(data.data.submittedAt), "dd MMM yyyy, hh:mm a")
              : "Loading..."}
          </Typography>
        </CardContent>
      </Card>
    </>
  )
}
