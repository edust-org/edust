"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { quizHooks } from "@/hooks/quiz-hooks"
import {
    Button,
    Input,
    Textarea,
    Typography,
    Select,
    SelectItem,
    SelectContent,
    SelectTrigger,
    SelectValue,
} from "@edust/ui"
import { useUpdateQuiz } from "@/hooks/quiz-hooks"
import { toast } from "sonner"


type Visibility = "PUBLIC_FOR_STUDENTS" | "PRIVATE" | "ORGANIZATION"

export default function EditQuizPage() {
    const router = useRouter()
    const { quizId, orgId } = useParams() as { quizId: string; orgId: string }

    // Fetch quiz data by ID
    const { data: quizData, isLoading: isQuizLoading } = quizHooks.useGetQuizById(orgId, quizId)

    // Update quiz mutation with loading state
    const { mutate: updateQuiz, status } = useUpdateQuiz()
    const isUpdating = status === "pending"
    
    // State with proper typing for visibility
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [visibility, setVisibility] = useState<Visibility>("PUBLIC_FOR_STUDENTS")
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
                    toast.success('successfully update')
                    router.push(`/orgs/${orgId}/quizzes`)
                },
            }
        )
    }

    if (isQuizLoading) return <Typography>Loading...</Typography>

    return (
        <div className="max-w-2xl mx-auto py-10">
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
                    <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>

                <div>
                    <label>Visibility</label>
                    <Select value={visibility} onValueChange={(value) => setVisibility(value as Visibility)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select visibility" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="PUBLIC_FOR_STUDENTS">Public</SelectItem>
                            <SelectItem value="PRIVATE">Private</SelectItem>
                            <SelectItem value="ORGANIZATION">Organization</SelectItem>
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
