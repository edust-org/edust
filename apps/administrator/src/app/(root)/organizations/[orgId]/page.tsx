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
import { useParams } from "next/navigation"

// {
//     "id": "1eda04d7-71f7-4acc-ab15-3744688ecdc4",
//     "name": "harvard university",
//     "orgUsername": "harvard-univ",
//     "profilePic": null,
//     "email": null,
//     "location": null,
//     "profileVerified": "UNVERIFIED",
//     "status": "ACTIVE",
//     "createdAt": "2024-07-26T17:07:32.709Z",
//     "updatedAt": "2024-11-22T10:42:47.383Z"
// }

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
  console.log(post)

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
