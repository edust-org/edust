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
import Link from "next/link"

import Loading from "./loading"

interface Feedback {
  id: string
  createdAt: string
  comments: string
  status: string
  rating: number
}

export default function Feedback() {
  const { isPending, error, data } = useQuery({
    queryKey: ["instituteData"],
    queryFn: async () =>
      await axios.get(
        `${defaultValues.backendURL}/api/v0/administrator/feedback`,
      ),
  })

  if (isPending) return <Loading />

  if (error) return "An error has occurred: " + error.message
  return (
    <>
      <Table>
        <TableCaption>A list of feedback.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Comments</TableHead>
            <TableHead>Status</TableHead>

            <TableHead>CreatedAt</TableHead>
            <TableHead>Rating</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.data.data.items.map((feedback: Feedback) => (
            <TableRow key={feedback.id}>
              <TableCell className="text-left">{feedback.comments}</TableCell>
              <TableCell>{feedback.status}</TableCell>

              <TableCell>{feedback.createdAt}</TableCell>
              <TableCell>{feedback.rating}</TableCell>

              <TableCell>
                <Link
                  href={`/feedback/${feedback.id}`}
                  className="text-blue-500 underline"
                >
                  Details
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
