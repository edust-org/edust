const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL + "/api/v0"
import { getSession } from "next-auth/react"

import type { ApiResponse } from "@edust/types"
import { ReactNode } from "react"

export interface QuizQuestion {
  type: "SINGLE_CHOICE" | "MULTIPLE_CHOICE"
  question: string
  points: number
  options: {
    text: string
    isCorrect: boolean
  }[]
}

export interface CreateQuizRequest {
  title: string
  description: string
  visibility: "PUBLIC_FOR_STUDENTS" | "ORG_ONLY" 
  timeLimit: number
  maxAttempts: number
  questions: QuizQuestion[]
}

export interface Quiz {
  orgQuizQuestions: any
  attemptLimit: string
  timeLimitMinutes: ReactNode
  status: string
  questionCount: ReactNode
  id: string
  title: string
  description: string
  visibility: "PUBLIC_FOR_STUDENTS" | "ORG_ONLY" 
  timeLimit: number
  maxAttempts: number
  questions: {
    id: string
    type: "SINGLE_CHOICE" | "MULTIPLE_CHOICE"
    question: string
    options: {
      id: string
      answerText: string
      isCorrect: boolean
    }[]
    points: number
  }[]
  createdAt?: string
  updatedAt?: string
}

export class ApiClient {
  public baseUrl: string

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl
  }

  public async request<T>(endpoint: string, options: RequestInit = {}, orgId?: string): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`
    const session = await getSession()
    const token = session?.accessToken

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...(orgId && { "X-Active-Org-Id": orgId }),
        ...options.headers,
      },
      ...options,
    }

    const response = await fetch(url, config)

    if (!response.ok) {
      let errorBody: any
      try {
        errorBody = await response.json()
      } catch {
        errorBody = await response.text()
      }
      console.error("API Error Response Body:", errorBody)
      throw new Error(`API Error: ${response.status} ${response.statusText} - ${JSON.stringify(errorBody)}`)
    }

    return response.json()
  }

  async createQuiz(orgId: string, quiz: CreateQuizRequest): Promise<ApiResponse<Quiz>> {
    return this.request<Quiz>(`/orgs/${orgId}/quizzes`, {
      method: "POST",
      body: JSON.stringify(quiz),
    }, orgId)
  }

  async getQuizzes(orgId: string): Promise<ApiResponse<{ items: Quiz[] }>> {
    return this.request<{ items: Quiz[] }>(`/orgs/${orgId}/quizzes`, {}, orgId)
  }

  async getQuiz(orgId: string, quizId: string): Promise<ApiResponse<Quiz>> {
    return this.request<Quiz>(`/orgs/${orgId}/quizzes/${quizId}`, {}, orgId)
  }

  async updateQuiz(orgId: string, quizId: string, quiz: Partial<CreateQuizRequest>): Promise<ApiResponse<Quiz>> {
    // Use PATCH if your backend supports partial update, else PUT
    return this.request<Quiz>(`/orgs/${orgId}/quizzes/${quizId}`, {
      method: "PATCH",
      body: JSON.stringify(quiz),
    }, orgId)
  }

  async deleteQuiz(orgId: string, quizId: string): Promise<ApiResponse<void>> {
    return this.request<void>(`/orgs/${orgId}/quizzes/${quizId}`, {
      method: "DELETE",
    }, orgId)
  }

  async updateQuestion(
  orgId: string,
  quizId: string,
  questionId: string,
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
): Promise<ApiResponse<any>> {
  return this.request(`/orgs/${orgId}/quizzes/${quizId}/questions/${questionId}`, {
    method: "PATCH",
    body: JSON.stringify(body),
  }, orgId)
}

}

export const apiClient = new ApiClient()
