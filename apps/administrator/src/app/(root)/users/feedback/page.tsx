"use client";

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui";
import { defaultValues } from "@/configs";
import axios from "@/lib/axios";
import { useSearchParams } from "next/navigation";



import { useEffect, useState } from "react";





interface Feedback {
  id: string
  comments: string
  status: string
  userId: string
  rating: number
}


export default function FeedbackPage() {
  const [users, setUsers] = useState([])
  const searchParams = useSearchParams()
  const id = searchParams.get("id")


  useEffect(() => {
    async function getFeedback() {
      try {
        const response = await axios.get(
          `${defaultValues.backendURL}/api/v0/administrator/users/${id}/feedback`,
        )
        console.log(response.data.data.items)
        setUsers(response.data.data.items)
      } catch (error) {
        console.error(error)
      }
    }
    getFeedback()
  }, [id])

  // This will not be logged on the server when using static rendering

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
          {users.map((user: Feedback) => (
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