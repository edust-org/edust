"use client";

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui";
import { defaultValues } from "@/configs";
import axios from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";



import Loading from "./loading";





interface Feedback {
  id: string
  createdAt: string
  comments: string
  status: string
  rating: number
}

// {
//     "id": "6c52e534-a6d4-414c-bd1a-6bd96820f100",
//     "rating": 4,
//     "userId": "b4bb02cc-7da5-4b2b-b842-48b0d1a5f886",
//     "improvementAreas": [
//         "perferendis",
//         "tener",
//         "aliquid"
//     ],
//     "comments": "Accusamus blanditiis ubi.",
//     "status": "DRAFT",
//     "createdAt": "1993-07-08T14:13:55.908Z",
//     "updatedAt": "1993-07-08T14:13:55.908Z"
// }
export default function Feedback() {
  const { isPending, error, data } = useQuery({
    queryKey: ["instituteData"],
    queryFn: async () =>
      await axios.get(
        `${defaultValues.backendURL}/api/v0/administrator/feedback`,
      ),
  })
  console.log(data)

  if (isPending) return <Loading />

  if (error) return "An error has occurred: " + error.message
  return (
    <>
      <TableCaption>
        <Table>
          <TableCaption>A list of institutes.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Comments</TableHead>
              <TableHead>
                {" "}
                <TableCell>Status</TableCell>
              </TableHead>

              <TableHead>CreatedAt</TableHead>
              <TableHead>Rating</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.data.data.items.map((feedback: Feedback) => (
              <TableRow key={feedback.id}>
                <TableCell>{feedback.comments}</TableCell>
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
      </TableCaption>
    </>
  )
}