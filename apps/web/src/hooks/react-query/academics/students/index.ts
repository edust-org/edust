import api from "@/lib/api"
import { useQuery } from "@tanstack/react-query"

export const student = {
  useGetQuizzes: ({
    academyId,
    studentId,
  }: {
    academyId: string | null
    studentId: string | null
  }) =>
    useQuery({
      queryKey: ["student-quizzes", academyId, studentId],
      queryFn: () =>
        api.v0.academics.student.getQuizzes({
          academyId: academyId!,
          studentId: studentId!,
        }),
      enabled: !!academyId && !!studentId,
    }),
}
