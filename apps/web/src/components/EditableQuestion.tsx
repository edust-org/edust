"use client"

import { useState } from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Input,
  Button,
} from "@edust/ui"
import { quizHooks } from "@/hooks/quiz-hooks"

interface EditableQuestionProps {
  orgId: string
  quizId: string
  questionIndex: number
  question: {
    id: string
    questionText: string
    points: number
    type: "SINGLE_CHOICE" | "MULTIPLE_CHOICE"
    orgQuizQuestionOption?: {
      id: string
      answerText: string
      isCorrect: boolean
    }[]
  }
}

export default function EditableQuestion({
  orgId,
  quizId,
  question,
  questionIndex,
}: EditableQuestionProps) {
  if (
    !question ||
    typeof question.questionText !== "string" ||
    typeof question.points !== "number"
  ) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Q{questionIndex + 1}: Invalid question data</CardTitle>
        </CardHeader>
      </Card>
    )
  }

  const [editMode, setEditMode] = useState(false)
  const [questionText, setQuestionText] = useState(question.questionText)
  const [points, setPoints] = useState(question.points)

  const updateQuestion = quizHooks.useUpdateQuestion()

  const handleSave = () => {
    updateQuestion.mutate({
      orgId,
      quizId,
      questionId: question.id,
      body: {
        type: question.type,
        question: questionText,
        points,
        options: question.orgQuizQuestionOption?.map((opt) => ({
          id: opt.id,
          answerText: opt.answerText,
          isCorrect: opt.isCorrect,
        })) ?? [],
      },
    })
    setEditMode(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Q{questionIndex + 1}:{" "}
          {editMode ? (
            <Input
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              placeholder="Question text"
            />
          ) : (
            question.questionText
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {editMode && (
          <Input
            type="number"
            value={points}
            onChange={(e) => setPoints(Number(e.target.value))}
            placeholder="Points"
          />
        )}

        {(question.orgQuizQuestionOption ?? []).map((opt) => (
          <div
            key={opt.id}
            className={`p-2 rounded border ${
              opt.isCorrect ? "border-green-500 bg-green-50" : "border-gray-200"
            }`}
          >
            {opt.answerText}
            {opt.isCorrect && (
              <span className="ml-2 text-green-600 font-medium">
                (Correct)
              </span>
            )}
          </div>
        ))}

        {editMode ? (
          <div className="flex gap-2">
            <Button onClick={handleSave} disabled={updateQuestion.isPending}>
              Save
            </Button>
            <Button variant="ghost" onClick={() => setEditMode(false)}>
              Cancel
            </Button>
          </div>
        ) : (
          <Button variant="outline" onClick={() => setEditMode(true)}>
            Edit
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
