"use client"

import { useParams } from "next/navigation"
import { quizHooks } from "@/hooks/quiz-hooks"
import {
  Typography,
  Card,
  CardHeader,
  CardTitle,
  Badge,
} from "@edust/ui"
import { Layout } from "../../../../components/layout"
import EditableQuestion from "@/components/EditableQuestion"

export default function QuizViewPage() {
  const { orgId, quizId } = useParams() as {
    orgId: string
    quizId: string
  }

  const { data: quizData, isLoading } = quizHooks.useGetQuizById(orgId, quizId)
  const quiz = quizData?.data

  if (isLoading) {
    return <Typography>Loading...</Typography>
  }

  if (!quiz) {
    return (
      <Typography variant="h3" className="text-red-600">
        Quiz not found.
      </Typography>
    )
  }

  return (
    <>
      <Layout.Header>
        <Typography variant="h1">Quiz Details</Typography>
      </Layout.Header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{quiz.title}</CardTitle>
            <p className="text-sm text-gray-600">{quiz.description}</p>
            <div className="mt-2 flex gap-2 text-sm text-gray-500">
              <Badge variant="outline">{quiz.visibility}</Badge>
              <Badge variant="outline">{quiz.timeLimitMinutes} min</Badge>
              <Badge variant="outline">
                {quiz.attemptLimit || "Unlimited"} attempts
              </Badge>
            </div>
          </CardHeader>
        </Card>

        {Array.isArray(quiz.orgQuizQuestions) && quiz.orgQuizQuestions.length > 0 ? (
          <div className="space-y-6">
            {quiz.orgQuizQuestions.map((question, index) => (
              <EditableQuestion
                key={question.id}
                orgId={orgId}
                quizId={quizId}
                question={question}
                questionIndex={index}
              />
            ))}
          </div>
        ) : (
          <Typography>No questions added yet.</Typography>
        )}
      </div>
    </>
  )
}
