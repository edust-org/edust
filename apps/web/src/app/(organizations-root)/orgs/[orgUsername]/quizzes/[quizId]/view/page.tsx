"use client"

import { Layout } from "@/components"
import EditableQuestion from "@/components/EditableQuestion"
import { quizHooks } from "@/hooks/quiz-hooks"
import { useAuthStore } from "@/store"
import { Badge, Card, CardHeader, CardTitle, Typography } from "@edust/ui"
import { useParams } from "next/navigation"

export default function QuizViewPage() {
  const { quizId } = useParams() as {
    quizId: string
  }

  const orgId = useAuthStore().activeOrgId

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
    <Layout>
      <Layout.Header>
        <Typography variant="h1">Quiz Details</Typography>
      </Layout.Header>

      <div className="mx-auto max-w-4xl px-4 py-6">
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

        {Array.isArray(quiz.orgQuizQuestions) &&
        quiz.orgQuizQuestions.length > 0 &&
        orgId ? (
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
    </Layout>
  )
}
