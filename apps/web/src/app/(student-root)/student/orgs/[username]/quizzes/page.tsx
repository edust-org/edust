"use client"

import { academicHooks } from "@/hooks/react-query"
import { useAuthStore } from "@/store"
import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Typography,
} from "@edust/ui"

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
        <Typography variant="h1">Quizzes</Typography>
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
                </CardContent>
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
