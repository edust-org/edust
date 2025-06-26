"use client"

import { ShareButton } from "@/components"
import { academicHooks } from "@/hooks/react-query"
import { useAuthStore } from "@/store"
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Input,
  Label,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Typography,
} from "@edust/ui"
import { format } from "date-fns"
import { Copy, Link as IconLink, Share2 } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

import { useState } from "react"

import { Layout } from "../components/layout"

export default function QuizzesPage() {
  const { getActiveProfileOrg } = useAuthStore()

  const activeProfileOrg = getActiveProfileOrg()

  const [shareCode, setShareCode] = useState("")
  const [selectedQuiz, setSelectedQuiz] = useState<null>(null)

  const { data: quizzes, isLoading } = academicHooks.student.useGetQuizzes({
    academyId: activeProfileOrg?.organization.id || null,
    studentId: activeProfileOrg?.studentId || null,
  })

  const getShareableLink = (quiz: Quiz) => {
    return `${window.location.origin}/quiz/join/${quiz.shareCode}`
  }

  const handleCopyShareCode = (code: string) => {
    navigator.clipboard.writeText(code)
    toast.success("Share code copied to clipboard")
  }

  const handleCopyShareLink = (quiz: Quiz) => {
    const link = getShareableLink(quiz)
    navigator.clipboard.writeText(link)
    toast.success("Share link copied to clipboard")
  }

  const handleDeleteQuiz = (id: string) => {
    toast.success("Quiz deleted successfully")
  }

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
                  <Button
                    variant={"ghost"}
                    onClick={() => {
                      setSelectedQuiz(quiz)
                      setShareCode(quiz.shareCode)
                    }}
                  >
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
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

        {/* share your result */}
        <Dialog
          open={!!selectedQuiz}
          onOpenChange={(open) => !open && setSelectedQuiz(null)}
        >
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Share Quiz</DialogTitle>
              <DialogDescription>
                Share this quiz with students using either the code or the
                direct link.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="space-y-2">
                <Label htmlFor="shareLink">Direct Link</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="shareLink"
                    value={selectedQuiz ? getShareableLink(selectedQuiz) : ""}
                    readOnly
                    className="text-sm"
                  />
                  <Button
                    variant="outline"
                    onClick={() =>
                      selectedQuiz && handleCopyShareLink(selectedQuiz)
                    }
                    size="sm"
                  >
                    <IconLink className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-muted-foreground text-xs">
                  Students can click this link to join directly.
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => setSelectedQuiz(null)}>Done</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Layout.Body>
    </Layout>
  )
}
