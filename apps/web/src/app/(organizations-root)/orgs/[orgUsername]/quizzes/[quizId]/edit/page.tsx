"use client"

import { quizHooks } from "@/hooks/quiz-hooks"
import { useUpdateQuiz } from "@/hooks/quiz-hooks"
import { useAuthStore } from "@/store"
import {
  Button,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
  Typography,
} from "@edust/ui"
import { useParams, useRouter } from "next/navigation"
import { toast } from "sonner"

import { useEffect, useState } from "react"

type Visibility = "PUBLIC_FOR_STUDENTS" | "PRIVATE" | "ORGANIZATION"

export default function EditQuizPage() {
  const router = useRouter()
  const { orgUsername, quizId } = useParams<{
    orgUsername: string
    quizId: string
  }>()

  const orgId = useAuthStore().activeOrgId

  // Fetch quiz data by ID
  const { data: quizData, isLoading: isQuizLoading } = quizHooks.useGetQuizById(
    orgId,
    quizId,
  )

  // Update quiz mutation with loading state
  const { mutate: updateQuiz, status } = useUpdateQuiz()
  const isUpdating = status === "pending"

  // State with proper typing for visibility
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [visibility, setVisibility] = useState<Visibility>(
    "PUBLIC_FOR_STUDENTS",
  )
  const [timeLimit, setTimeLimit] = useState(0)
  const [maxAttempts, setMaxAttempts] = useState(0)

  useEffect(() => {
    if (quizData?.data) {
      const q = quizData.data
      setTitle(q.title ?? "")
      setDescription(q.description ?? "")
      setVisibility((q.visibility as Visibility) ?? "PUBLIC_FOR_STUDENTS")
      setTimeLimit(q.timeLimit ?? 0)
      setMaxAttempts(q.maxAttempts ?? 0)
    }
  }, [quizData])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!orgId) return null

    updateQuiz(
      {
        orgId,
        quizId,
        body: {
          title,
          description,
          visibility,
          timeLimit,
          maxAttempts,
        },
      },
      {
        onSuccess: () => {
          toast.success("successfully update")
          router.push(`/orgs/${orgUsername}/quizzes`)
        },
      },
    )
  }

  if (isQuizLoading) return <Typography>Loading...</Typography>

  return (
    <div className="mx-auto max-w-2xl py-10">
      <Typography variant="h2" className="mb-6">
        Edit Quiz
      </Typography>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Title</label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>

        <div>
          <label>Description</label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <label>Visibility</label>
          <Select
            value={visibility}
            onValueChange={(value) => setVisibility(value as Visibility)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select visibility" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PUBLIC_FOR_STUDENTS">Public</SelectItem>
              <SelectItem value="ORG_ONLY">Organization</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label>Time Limit (in minutes)</label>
          <Input
            type="number"
            value={timeLimit}
            onChange={(e) => setTimeLimit(Number(e.target.value))}
          />
        </div>

        <div>
          <label>Max Attempts</label>
          <Input
            type="number"
            value={maxAttempts}
            onChange={(e) => setMaxAttempts(Number(e.target.value))}
          />
        </div>

        <Button type="submit" disabled={isUpdating}>
          {isUpdating ? "Updating..." : "Update Quiz"}
        </Button>
      </form>
    </div>
  )
}
