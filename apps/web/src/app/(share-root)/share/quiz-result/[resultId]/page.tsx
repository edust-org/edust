"use client"

import { useGetQuizResultByResultToken } from "@/hooks/react-query"
import { Card, CardContent, CardHeader, CardTitle, Typography } from "@edust/ui"
import { useParams } from "next/navigation"

import React from "react"

export default function ShareQuizResultPage() {
  const { resultId } = useParams<{ resultId: string }>()

  const { data, isLoading } = useGetQuizResultByResultToken(resultId)

  return (
    <>
      {isLoading ? <Typography variant="h2">Loading...</Typography> : null}
      <Card className="mx-auto mt-10 max-w-2xl">
        <CardHeader>
          <CardTitle>{data?.data.title}</CardTitle>
        </CardHeader>
        <CardContent>{JSON.stringify(data?.data || {}, null, 2)}</CardContent>
      </Card>
    </>
  )
}
