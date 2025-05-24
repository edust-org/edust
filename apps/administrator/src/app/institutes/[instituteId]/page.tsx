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
import Link from "next/link"
import { useParams } from "next/navigation"

import Loading from "./loading"

export default function InstituteDetails() {
  const params = useParams<{ instituteId: string }>()

  const { isPending, error, data } = useQuery({
    queryKey: ["instituteDetailsData"],
    queryFn: async () =>
      await axios.get(
        `${defaultValues.backendURL}/api/v0/administrator/institutes/${params.instituteId}`,
      ),
  })

  const info = data?.data?.data

  if (isPending) return <Loading />

  if (error) return "An error has occurred: " + error.message
  return (
    <>
      <Card className={cn("w-[380px]")}>
        <CardHeader>
          <Avatar>
            <AvatarImage
              src={info?.author?.profilePic}
              alt={info?.author?.name}
            />
            <AvatarFallback>Edust</AvatarFallback>
          </Avatar>
          <CardTitle>Name: {info.name}</CardTitle>
          <CardDescription>Category: {info.instituteCategory}</CardDescription>
        </CardHeader>
        <CardContent>
          <Typography>Slug: {info.slug} </Typography>
          <Typography>Email: {info.contactEmail} </Typography>
          <Typography>Phone Number: {info.phoneNumber} </Typography>
          <Typography>
            {" "}
            Website:
            <Link
              href={info.website}
              target="_blank"
              className="px-1 text-blue-500 underline"
            >
              Visit
            </Link>
          </Typography>
        </CardContent>
        <CardFooter>
          <Typography>Author Name: {info?.author?.name}</Typography>
        </CardFooter>
      </Card>
    </>
  )
}
