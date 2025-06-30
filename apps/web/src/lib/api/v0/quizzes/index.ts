import type { ApiResponse } from "@edust/types"
import type { CreateQuizBody, Quiz, QuizListItem, UpdateQuizBody } from "@/hooks/quiz-hooks"

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api/v0"

export const quizzesApi = {
  postQuiz: async ({ orgId, body }: { orgId: string; body: CreateQuizBody }): Promise<ApiResponse<Quiz>> => {
    const response = await fetch(`${BASE_URL}/orgs/${orgId}/quizzes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      throw new Error(`Failed to create quiz: ${response.statusText}`)
    }

    return response.json()
  },

  getQuizzes: async ({ orgId }: { orgId: string }): Promise<ApiResponse<{ items: QuizListItem[] }>> => {
    const response = await fetch(`${BASE_URL}/orgs/${orgId}/quizzes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch quizzes: ${response.statusText}`)
    }

    return response.json()
  },

  getQuizById: async ({ orgId, quizId }: { orgId: string; quizId: string }): Promise<ApiResponse<Quiz>> => {
    const response = await fetch(`${BASE_URL}/orgs/${orgId}/quizzes/${quizId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch quiz: ${response.statusText}`)
    }

    return response.json()
  },

  patchQuizById: async ({
    orgId,
    quizId,
    body,
  }: {
    orgId: string
    quizId: string
    body: UpdateQuizBody
  }): Promise<ApiResponse<Quiz>> => {
    const response = await fetch(`${BASE_URL}/orgs/${orgId}/quizzes/${quizId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      throw new Error(`Failed to update quiz: ${response.statusText}`)
    }

    return response.json()
  },

  deleteQuizById: async ({ orgId, quizId }: { orgId: string; quizId: string }): Promise<ApiResponse<null>> => {
    const response = await fetch(`${BASE_URL}/orgs/${orgId}/quizzes/${quizId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to delete quiz: ${response.statusText}`)
    }

    return response.json()
  },

  getQuizResults: async ({
    orgId,
    quizId,
  }: { orgId: string; quizId: string }): Promise<ApiResponse<{ items: any[] }>> => {
    const response = await fetch(`${BASE_URL}/orgs/${orgId}/quizzes/${quizId}/results`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch quiz results: ${response.statusText}`)
    }

    return response.json()
  },

  getQuizAnalytics: async ({ orgId, quizId }: { orgId: string; quizId: string }): Promise<ApiResponse<any>> => {
    const response = await fetch(`${BASE_URL}/orgs/${orgId}/quizzes/${quizId}/analytics`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch quiz analytics: ${response.statusText}`)
    }

    return response.json()
  },

  publishQuiz: async ({ orgId, quizId }: { orgId: string; quizId: string }): Promise<ApiResponse<Quiz>> => {
    const response = await fetch(`${BASE_URL}/orgs/${orgId}/quizzes/${quizId}/publish`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to publish quiz: ${response.statusText}`)
    }

    return response.json()
  },

  unpublishQuiz: async ({ orgId, quizId }: { orgId: string; quizId: string }): Promise<ApiResponse<Quiz>> => {
    const response = await fetch(`${BASE_URL}/orgs/${orgId}/quizzes/${quizId}/unpublish`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to unpublish quiz: ${response.statusText}`)
    }

    return response.json()
  },

  duplicateQuiz: async ({
    orgId,
    quizId,
    body,
  }: {
    orgId: string
    quizId: string
    body: { title: string }
  }): Promise<ApiResponse<Quiz>> => {
    const response = await fetch(`${BASE_URL}/orgs/${orgId}/quizzes/${quizId}/duplicate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      throw new Error(`Failed to duplicate quiz: ${response.statusText}`)
    }

    return response.json()
  },
}
