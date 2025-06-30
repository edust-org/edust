import api from "@/lib/api"
import type { ApiResponse } from "@edust/types"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { Quiz, QuizQuestion, CreateQuizRequest as CreateQuizBody } from "@/lib/api-client"

export interface QuizListItem {
  id: string
  title: string
  description: string
  visibility: string
  timeLimit: number
  maxAttempts: number
  questionCount: number
  createdAt: string
  updatedAt: string
}

export interface UpdateQuizBody extends Partial<CreateQuizBody> { }

export const quizHooks = {
  usePostQuiz: () => {
    const queryClient = useQueryClient()
    return useMutation<ApiResponse<Quiz>, unknown, { orgId: string; body: CreateQuizBody }>({
      mutationFn: ({ orgId, body }) => api.quizzes.createQuiz(orgId, body),
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({ queryKey: ["quizzes", variables.orgId] })
      },
    })
  },

  useGetQuizzes: (orgId: string | null) =>
    useQuery<ApiResponse<{ items: Quiz[] }>>({
      queryKey: ["quizzes", orgId],
      queryFn: () => api.quizzes.getQuizzes(orgId!),
      enabled: !!orgId,
    }),

  useGetQuizById: (orgId: string | null, quizId: string | null) =>
    useQuery<ApiResponse<Quiz>>({
      queryKey: ["quiz", orgId, quizId],
      queryFn: () => api.quizzes.getQuiz(orgId!, quizId!),
      enabled: !!orgId && !!quizId,
    }),

  usePatchQuizById: () => {
    const queryClient = useQueryClient()
    return useMutation<ApiResponse<Quiz>, unknown, { orgId: string; quizId: string; body: UpdateQuizBody }>({
      mutationFn: ({ orgId, quizId, body }) => api.quizzes.updateQuiz(orgId, quizId, body),
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({ queryKey: ["quiz", variables.orgId, variables.quizId] })
        queryClient.invalidateQueries({ queryKey: ["quizzes", variables.orgId] })
      },
    })
  },

  useDeleteQuizById: () => {
    const queryClient = useQueryClient()
    return useMutation<ApiResponse<void>, unknown, { orgId: string; quizId: string }>({
      mutationFn: ({ orgId, quizId }) => api.quizzes.deleteQuiz(orgId, quizId),
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({ queryKey: ["quiz", variables.orgId, variables.quizId] })
        queryClient.invalidateQueries({ queryKey: ["quizzes", variables.orgId] })
      },
    })
  },
  useUpdateQuestion: () => {
    const queryClient = useQueryClient()

    return useMutation<
      ApiResponse<any>,
      unknown,
      {
        orgId: string
        quizId: string
        questionId: string
        body: {
          type: "SINGLE_CHOICE" | "MULTIPLE_CHOICE"
          question: string
          points: number
          options: {
            id: string
            answerText: string
            isCorrect: boolean
          }[]
        }
      }
    >({
      mutationFn: ({ orgId, quizId, questionId, body }) =>
        api.quizzes.updateQuestion(orgId, quizId, questionId, body),
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({ queryKey: ["quiz", variables.orgId, variables.quizId] })
      },
    })
  }

}

// ✅ Define outside for proper type inference
export function useUpdateQuiz() {
  const queryClient = useQueryClient()
  return useMutation<ApiResponse<Quiz>, unknown, { orgId: string; quizId: string; body: UpdateQuizBody }>({
    mutationFn: ({ orgId, quizId, body }) => api.quizzes.updateQuiz(orgId, quizId, body),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["quiz", variables.orgId, variables.quizId] })
      queryClient.invalidateQueries({ queryKey: ["quizzes", variables.orgId] })
    },
  })
}

export type { QuizQuestion, CreateQuizRequest as CreateQuizBody, Quiz } from "@/lib/api-client"
