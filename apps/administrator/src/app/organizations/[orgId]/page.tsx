"use client"

import { defaultValues } from "@/configs"
import axios from "@/lib/axios"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@edust/ui"
import { Avatar, AvatarFallback, AvatarImage, Typography } from "@edust/ui"
import { cn } from "@edust/ui/utils"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "next/navigation"

export default function OrganizationsDetails() {
  const params = useParams<{ orgId: string }>()

  const { isPending, error, data } = useQuery({
    queryKey: ["organizationDetailsData"],
    queryFn: async () =>
      await axios.get(
        `${defaultValues.backendURL}/api/v0/administrator/organizations/${params.orgId}`,
      ),
  })

  const post = data?.data?.data

  if (isPending) return "Loading..."

  if (error) return "An error has occurred: " + error.message

  return (
    <>
      <Card className={cn("w-[380px]")}>
        <CardHeader>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt={post.name} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <CardTitle>Name: {post?.name}</CardTitle>
          <CardDescription>ID: {post?.id}</CardDescription>
        </CardHeader>
        <CardContent>
          <Typography>Org Username: {post?.orgUsername} </Typography>
          <Typography>Email: {post?.email} </Typography>
          <Typography>Org Username: {post?.status} </Typography>
        </CardContent>
        <CardFooter>
          <Typography>Profile Verified: {post?.profileVerified}</Typography>
        </CardFooter>
      </Card>
    </>
  )
}
