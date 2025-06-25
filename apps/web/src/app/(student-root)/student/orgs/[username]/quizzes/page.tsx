"use client"

import { ShareButton } from "@/components"
import { academicHooks } from "@/hooks/react-query"
import { useAuthStore } from "@/store"
import {
  Badge,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Typography,
} from "@edust/ui"
import { format } from "date-fns"
import Link from "next/link"

import { Layout } from "../components/layout"

export default function QuizzesPage() {
  const { getActiveProfileOrg } = useAuthStore()

  const activeProfileOrg = getActiveProfileOrg()

  const { data: quizzes, isLoading } = academicHooks.student.useGetQuizzes({
    academyId: activeProfileOrg?.organization.id || null,
    studentId: activeProfileOrg?.studentId || null,
  })

  if (isLoading) {
    return <Typography variant="h2">Loading...</Typography>
  }

  return (
    <Layout>
      <Layout.Header>
        <Typography variant="h1">Your Quiz Attempts</Typography>
      </Layout.Header>
      <Layout.Body>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {quizzes?.length ? (
            quizzes.map((quiz) => (
              <Card key={quiz.id}>
                <CardHeader>
                  <CardTitle>
                    {quiz.title} <Badge>{quiz.status}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Typography>
                    {quiz.description || "No description available."}
                  </Typography>
                  <Table className="mt-4">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Key</TableHead>
                        <TableHead>Value</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">
                          Attempt Limit
                        </TableCell>
                        <TableCell>{quiz.attemptLimit}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          Time Limit (minutes)
                        </TableCell>
                        <TableCell>{quiz.timeLimitMinutes}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          Started At
                        </TableCell>
                        <TableCell>
                          {format(new Date(quiz.startedAt), "yyyy-MM-dd HH:mm")}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          Submitted At
                        </TableCell>
                        <TableCell>
                          {format(
                            new Date(quiz.submittedAt),
                            "yyyy-MM-dd HH:mm",
                          )}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          Created At
                        </TableCell>
                        <TableCell>
                          {format(new Date(quiz.createdAt), "yyyy-MM-dd HH:mm")}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          Updated At
                        </TableCell>
                        <TableCell>
                          {format(new Date(quiz.updatedAt), "yyyy-MM-dd HH:mm")}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          Earned Points
                        </TableCell>
                        <TableCell>{quiz.earnedPoints}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          Max Points
                        </TableCell>
                        <TableCell>{quiz.maxPoints}</TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium">
                          View Result
                        </TableCell>
                        <TableCell>
                          <Link
                            href={`/share/quiz-result/${quiz.resultToken}`}
                            className="hover:underline"
                            target="_blank"
                          >
                            click here
                          </Link>
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium">
                          Visibility
                        </TableCell>
                        <TableCell>{quiz.visibility}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  <ShareButton
                    text={`${window.origin}//share/quiz-result/${quiz.resultToken}`}
                  />
                </CardFooter>
              </Card>
            ))
          ) : (
            <Typography variant="h3">No quizzes available.</Typography>
          )}
        </div>
      </Layout.Body>
    </Layout>
  )
}
