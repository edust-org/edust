import { defaultValues } from "@/configs"
import axios from "@/lib/axios"

import * as student from "./students"

const BASE_URL = `${defaultValues.apiV0URL}/academics`

export const academics = {
  student,
  getQuizById: async ({
    academyId,
    quizId,
  }: {
    academyId: string
    quizId: string
  }): Promise<any> => {
    const response = await axios.get(
      `${BASE_URL}/${academyId}/quizzes/${quizId}`,
    )
    return response.data
  },

  quizAttemptStart: async ({
    academyId,
    quizId,
    body,
  }: {
    academyId: string
    quizId: string
    body: any
  }): Promise<any> => {
    const response = await axios.post(
      `${BASE_URL}/${academyId}/quizzes/${quizId}/start`,
      body,
    )
    return response.data
  },

  quizAttemptSubmit: async ({
    academyId,
    quizId,
    body,
  }: {
    academyId: string
    quizId: string
    body: any
  }): Promise<any> => {
    const response = await axios.post(
      `${BASE_URL}/${academyId}/quizzes/${quizId}/submit`,
      body,
    )
    return response.data
  },
}
