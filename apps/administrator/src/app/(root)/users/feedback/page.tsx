"use client"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui"
import { defaultValues } from "@/configs"
import axios from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "next/navigation"

interface Feedback {
  id: string
  comments: string
  status: string
  userId: string
  rating: number
}

export default function FeedbackPage() {
  const searchParams = useSearchParams()
  const id = searchParams.get("id")

  const { isPending, error, data } = useQuery({
    queryKey: ["feedbackData"],
    queryFn: async () =>
      await axios.get(
        `${defaultValues.backendURL}/api/v0/administrator/users/${id}/feedback`,
      ),
  })
  if (isPending) return "Loading..."

  if (error) return "An error has occurred: " + error.message

  return (
    <>
      <Table>
        <TableCaption>A list of users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Status</TableHead>
            <TableHead>Comment</TableHead>
            <TableHead>UserId</TableHead>
            <TableHead>Rating</TableHead>
            {/* <TableHead className="text-right">Amount</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.data.data.items.map((user: Feedback) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.status}</TableCell>
              <TableCell>{user.comments}</TableCell>
              <TableCell>{user.userId}</TableCell>
              <TableCell>{user.rating}</TableCell>

              {/* <TableCell className="text-right">{user.profilePic}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
