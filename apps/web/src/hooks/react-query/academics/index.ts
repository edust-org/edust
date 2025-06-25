import api from "@/lib/api"
import { useMutation, useQuery } from "@tanstack/react-query"

import { student } from "./students"

export const academicHooks = {
  student,
  useGetQuizById: ({
    academyId,
    quizId,
  }: {
    academyId: string | null
    quizId: string | null
  }) =>
    useQuery({
      queryKey: ["quiz", academyId, quizId],
      queryFn: () =>
        api.v0.academics.getQuizById({
          academyId: academyId!,
          quizId: quizId!,
        }),
      enabled: !!academyId && !!quizId,
    }),

  useQuizAttemptStart: () =>
    useMutation({
      mutationFn: ({
        academyId,
        quizId,
        body,
      }: {
        academyId: string
        quizId: string
        body: any
      }) => api.v0.academics.quizAttemptStart({ academyId, quizId, body }),
    }),

  useQuizAttemptSubmit: () =>
    useMutation({
      mutationFn: ({
        academyId,
        quizId,
        body,
      }: {
        academyId: string
        quizId: string
        body: any
      }) => api.v0.academics.quizAttemptSubmit({ academyId, quizId, body }),
    }),
}
