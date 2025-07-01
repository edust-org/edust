"use client"

import { defaultValues } from "@/configs"
import axios from "@/lib/axios"
import { useAuthStore } from "@/store"
import { Button, Typography } from "@edust/ui"
import { useParams, useRouter } from "next/navigation"

import { useEffect, useState } from "react"

import { Layout } from "../../../components/layout"

export default function Attempt() {
  const router = useRouter()
  const { quizId } = useParams<{ quizId: string }>()
  const [quiz, setQuiz] = useState<any>(null)
  const [resultId, setResultId] = useState<string | null>(null)
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({})
  const { activeProfileOrgId: academyId } = useAuthStore()

  useEffect(() => {
    if (academyId) {
      axios
        .get(
          `${defaultValues.apiV0URL}/academics/${academyId}/quizzes/${quizId}`,
        )
        .then((res) => setQuiz(res.data.data))
    }
  }, [quizId, academyId])

  const startQuiz = async () => {
    const res = await axios.post(
      `${defaultValues.apiV0URL}/academics/${academyId}/quizzes/${quizId}/start`,
    )
    setResultId(res.data.data.resultId)
  }

  const submitQuiz = async () => {
    const payload = {
      resultId,
      answers: Object.entries(answers).map(([questionId, val]) => ({
        questionId,
        answerId: typeof val === "string" ? val : undefined,
        answerIds: Array.isArray(val) ? val : undefined,
      })),
    }

    await axios.post(
      `${defaultValues.apiV0URL}/academics/${academyId}/quizzes/${quizId}/submit`,
      payload,
    )
    router.push("/")
  }

  if (!quiz) return <Typography>Loading...</Typography>

  return (
    <Layout className="space-y-4">
      <Layout.Header>
        <Typography variant="h4">{quiz.title}</Typography>
      </Layout.Header>
      <Layout.Body>
        <Typography>{quiz.description}</Typography>

        {!resultId && <Button onClick={startQuiz}>Start Quiz</Button>}

        {resultId && (
          <div className="space-y-4">
            {quiz.orgQuizQuestions.map((q: any) => (
              <div key={q.id}>
                <Typography>{q.questionText}</Typography>
                {q.type === "SINGLE_CHOICE"
                  ? q.orgQuizQuestionOptions.map((opt: any) => (
                      <label key={opt.id} className="block">
                        <input
                          type="radio"
                          name={q.id}
                          value={opt.id}
                          checked={answers[q.id] === opt.id}
                          onChange={() =>
                            setAnswers({ ...answers, [q.id]: opt.id })
                          }
                        />
                        {opt.optionText}
                      </label>
                    ))
                  : q.orgQuizQuestionOptions.map((opt: any) => (
                      <label key={opt.id} className="block">
                        <input
                          type="checkbox"
                          name={`${q.id}-${opt.id}`}
                          value={opt.id}
                          checked={
                            Array.isArray(answers[q.id]) &&
                            answers[q.id].includes(opt.id)
                          }
                          onChange={(e) => {
                            const prev = Array.isArray(answers[q.id])
                              ? answers[q.id]
                              : []
                            setAnswers({
                              ...answers,
                              [q.id]: e.target.checked
                                ? [...prev, opt.id]
                                : prev.filter((id: string) => id !== opt.id),
                            })
                          }}
                        />
                        {opt.optionText}
                      </label>
                    ))}
              </div>
            ))}

            <Button onClick={submitQuiz}>Submit</Button>
          </div>
        )}
      </Layout.Body>
    </Layout>
  )
}
