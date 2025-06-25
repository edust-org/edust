import { defaultValues } from "@/configs"
import axios from "@/lib/axios"

const BASE_URL = `${defaultValues.apiV0URL}/academics`
export const getQuizzes = async ({
  academyId,
  studentId,
}: {
  academyId: string
  studentId: string
}): Promise<any[]> => {
  const response = await axios.get(
    `${BASE_URL}/${academyId}/students/${studentId}/quizzes`,
  )
  return response.data?.data?.items || []
}
