"use client"

import { Layout } from "@/components"
import {
  type CreateQuizBody,
  type QuizQuestion,
  quizHooks,
} from "@/hooks/quiz-hooks"
import { useAuthStore } from "@/store"
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Checkbox,
  Input,
  Label,
  RadioGroup,
  RadioGroupItem,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Typography,
} from "@edust/ui"
import {
  AlertCircle,
  ArrowLeft,
  Badge,
  BookOpen,
  Building2,
  Check,
  Clock,
  Globe,
  GripVertical,
  Loader2,
  Lock,
  Plus,
  Save,
  Trash2,
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { useRef, useState } from "react"

interface Question {
  id: string
  type: "SINGLE_CHOICE" | "MULTIPLE_CHOICE"
  question: string
  options: string[]
  correctAnswers?: number[]
  correctAnswer?: number
  points: number
}

export default function CreateQuizPage() {
  const { orgUsername } = useParams<{ orgUsername: string }>()
  const router = useRouter()

  const orgId = useAuthStore().activeOrgId
  // React Query mutation
  const postQuizMutation = quizHooks.usePostQuiz()

  // Quiz metadata
  const [quizTitle, setQuizTitle] = useState("")
  const [quizDescription, setQuizDescription] = useState("")
  const [visibility, setVisibility] = useState<
    "PUBLIC_FOR_STUDENTS" | "ORG_ONLY"
  >("ORG_ONLY")

  // Quiz settings
  const [timeLimit, setTimeLimit] = useState(30)
  const [attemptLimit, setAttemptLimit] = useState(1)

  // Questions
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestion, setCurrentQuestion] = useState<Question>({
    id: "",
    type: "SINGLE_CHOICE",
    question: "",
    options: ["", ""],
    correctAnswer: undefined,
    points: 1,
  })

  // Drag and drop
  const dragItem = useRef<number | null>(null)
  const dragOverItem = useRef<number | null>(null)

  // Add a new question
  const addQuestion = () => {
    if (!currentQuestion.question.trim()) {
      toast.error("Please enter a question")
      return
    }

    // Validate that at least one option is filled and correct answer is selected
    const filledOptions = currentQuestion.options.filter((opt) => opt.trim())
    if (filledOptions.length < 2) {
      toast.error("Please provide at least 2 answer options")
      return
    }

    if (
      currentQuestion.type === "SINGLE_CHOICE" &&
      currentQuestion.correctAnswer === undefined
    ) {
      toast.error("Please select the correct answer")
      return
    }

    if (
      currentQuestion.type === "MULTIPLE_CHOICE" &&
      (!currentQuestion.correctAnswers ||
        currentQuestion.correctAnswers.length === 0)
    ) {
      toast.error("Please select at least one correct answer")
      return
    }

    const newQuestion = {
      ...currentQuestion,
      id: `question_${Date.now()}`,
      options: filledOptions, // Only save filled options
    }

    setQuestions([...questions, newQuestion])

    // Reset current question form
    setCurrentQuestion({
      id: "",
      type: "SINGLE_CHOICE",
      question: "",
      options: ["", ""],
      correctAnswer: undefined,
      points: 1,
    })

    toast.success("Question added successfully")
  }

  // Remove a question
  const removeQuestion = (id: string) => {
    setQuestions(questions.filter((q) => q.id !== id))
    toast.success("Question removed")
  }

  // Handle drag and drop reordering
  const handleDragStart = (index: number) => {
    dragItem.current = index
  }

  const handleDragEnter = (index: number) => {
    dragOverItem.current = index
  }

  const handleDragEnd = () => {
    if (dragItem.current !== null && dragOverItem.current !== null) {
      const newQuestions = [...questions]
      const draggedItem = newQuestions[dragItem.current]

      if (draggedItem) {
        newQuestions.splice(dragItem.current, 1)
        newQuestions.splice(dragOverItem.current, 0, draggedItem)
        setQuestions(newQuestions)
      }
    }
    dragItem.current = null
    dragOverItem.current = null
  }

  // Handle option changes for the current question
  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...currentQuestion.options]
    newOptions[index] = value
    setCurrentQuestion({ ...currentQuestion, options: newOptions })
  }

  // Add a new option to the current question
  const addOption = () => {
    setCurrentQuestion({
      ...currentQuestion,
      options: [...currentQuestion.options, ""],
    })
  }

  // Remove an option from the current question
  const removeOption = (index: number) => {
    if (currentQuestion.options.length <= 2) return

    const newOptions = [...currentQuestion.options]
    newOptions.splice(index, 1)

    // Adjust correct answers if needed
    if (currentQuestion.type === "SINGLE_CHOICE") {
      let correctAnswer = currentQuestion.correctAnswer
      if (correctAnswer !== undefined && correctAnswer >= index) {
        correctAnswer = correctAnswer > index ? correctAnswer - 1 : undefined
      }
      setCurrentQuestion({
        ...currentQuestion,
        options: newOptions,
        correctAnswer,
      })
    } else if (currentQuestion.type === "MULTIPLE_CHOICE") {
      let correctAnswers = [...(currentQuestion.correctAnswers || [])]
      correctAnswers = correctAnswers
        .filter((i) => i !== index)
        .map((i) => (i > index ? i - 1 : i))
      setCurrentQuestion({
        ...currentQuestion,
        options: newOptions,
        correctAnswers,
      })
    }
  }

  // Handle correct answer selection for single-choice
  const handleCorrectAnswerChange = (index: number) => {
    setCurrentQuestion({ ...currentQuestion, correctAnswer: index })
  }

  // Handle correct answers for multiple-choice
  const handleMultipleCorrectChange = (index: number, checked: boolean) => {
    let correctAnswers = [...(currentQuestion.correctAnswers || [])]

    if (checked) {
      correctAnswers.push(index)
    } else {
      correctAnswers = correctAnswers.filter((i) => i !== index)
    }

    setCurrentQuestion({ ...currentQuestion, correctAnswers })
  }

  // Handle question type change
  const handleQuestionTypeChange = (type: Question["type"]) => {
    const updatedQuestion: Question = {
      ...currentQuestion,
      type,
      options: currentQuestion.options.length
        ? currentQuestion.options
        : ["", ""],
    }

    if (type === "SINGLE_CHOICE") {
      updatedQuestion.correctAnswer = undefined
      delete updatedQuestion.correctAnswers
    } else {
      updatedQuestion.correctAnswers = []
      delete updatedQuestion.correctAnswer
    }

    setCurrentQuestion(updatedQuestion)
  }

  // Transform questions to API format
  const transformQuestionsToAPI = (questions: Question[]): QuizQuestion[] => {
    return questions.map((q) => ({
      type: q.type,
      question: q.question,
      points: q.points,
      options: q.options.map((option, index) => ({
        text: option, // ✅ this must be "text" not "answerText"
        isCorrect:
          q.type === "SINGLE_CHOICE"
            ? q.correctAnswer === index
            : q.correctAnswers?.includes(index) || false,
      })),
    }))
  }

  const saveQuiz = async (preview = false) => {
    if (!orgId) {
      toast.error("Organization ID is missing.")
      return
    }

    if (!quizTitle.trim()) {
      toast.error("Please enter a quiz title")
      return
    }

    if (questions.length === 0) {
      toast.error("Please add at least one question")
      return
    }

    const quizData: CreateQuizBody = {
      title: quizTitle,
      description: quizDescription,
      visibility,
      timeLimit,
      maxAttempts: attemptLimit,
      questions: transformQuestionsToAPI(questions),
    }
    console.log("Quiz payload being sent:", JSON.stringify(quizData, null, 2))

    try {
      const response = await postQuizMutation.mutateAsync({
        orgId,
        body: quizData,
      })
      console.log("💥 saveQuiz called", { quizData })

      toast.success("Quiz created successfully!")

      if (preview) {
        window.open(
          `/orgs/${orgUsername}/quizzes/${response.data.id}/preview`,
          "_blank",
        )
      } else {
        router.push(`/orgs/${orgUsername}/quizzes`)
      }
    } catch (error: any) {
      console.error("Error creating quiz:", error)
      toast.error(error?.message || "Failed to create quiz. Please try again.")
    }
  }

  const totalPoints = questions.reduce((sum, q) => sum + q.points, 0)

  return (
    <Layout>
      <Layout.Header>
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href={`/orgs/${orgUsername}/quizzes`}>
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Quizzes
              </Button>
            </Link>
            <Typography variant="h1">Create Quiz</Typography>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => saveQuiz(true)}
              disabled={
                !quizTitle ||
                questions.length === 0 ||
                postQuizMutation.isPending
              }
            >
              {postQuizMutation.isPending ? "Creating..." : "Create & Preview"}
            </Button>
            <Button
              onClick={() => saveQuiz(false)}
              disabled={
                !quizTitle ||
                questions.length === 0 ||
                postQuizMutation.isPending
              }
            >
              {postQuizMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Create Quiz
                </>
              )}
            </Button>
          </div>
        </div>
      </Layout.Header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Quiz Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">
                    Quiz Title <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="title"
                    value={quizTitle}
                    onChange={(e) => setQuizTitle(e.target.value)}
                    placeholder="Enter quiz title..."
                    className="mb-1"
                  />
                  <p className="text-xs text-gray-500">
                    Give your quiz a clear, descriptive title
                  </p>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={quizDescription}
                    onChange={(e) => setQuizDescription(e.target.value)}
                    placeholder="Describe what this quiz covers..."
                    rows={3}
                    className="mb-1"
                  />
                  <p className="text-xs text-gray-500">
                    Provide context and instructions for quiz takers
                  </p>
                </div>

                <div>
                  <Label htmlFor="visibility">Visibility</Label>
                  <Select
                    value={visibility}
                    onValueChange={(
                      value: "PUBLIC_FOR_STUDENTS" | "ORG_ONLY",
                    ) => setVisibility(value)}
                  >
                    <SelectTrigger id="visibility" className="mb-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PUBLIC_FOR_STUDENTS">
                        <div className="flex items-center">
                          <Globe className="mr-2 h-4 w-4" />
                          <span>Public - Anyone with the link</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="ORG_ONLY">
                        <div className="flex items-center">
                          <Building2 className="mr-2 h-4 w-4" />
                          <span>Organization - Members only</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500">
                    Control who can access your quiz
                  </p>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="builder" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="builder">Question Builder</TabsTrigger>
                <TabsTrigger value="settings">Quiz Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="builder" className="space-y-6">
                {/* Question Builder */}
                <Card>
                  <CardHeader>
                    <CardTitle>Create New Question</CardTitle>
                    <CardDescription>
                      Build your question with the options below
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="questionType">Question Type</Label>
                        <Select
                          value={currentQuestion.type}
                          onValueChange={(value: Question["type"]) =>
                            handleQuestionTypeChange(value)
                          }
                        >
                          <SelectTrigger id="questionType">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="SINGLE_CHOICE">
                              Single Choice
                            </SelectItem>
                            <SelectItem value="MULTIPLE_CHOICE">
                              Multiple Choice
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="points">Points</Label>
                        <Input
                          id="points"
                          type="number"
                          value={currentQuestion.points}
                          onChange={(e) =>
                            setCurrentQuestion({
                              ...currentQuestion,
                              points: Number(e.target.value),
                            })
                          }
                          min="1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="questionText">
                        Question <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        id="questionText"
                        value={currentQuestion.question}
                        onChange={(e) =>
                          setCurrentQuestion({
                            ...currentQuestion,
                            question: e.target.value,
                          })
                        }
                        placeholder="Enter your question..."
                        rows={2}
                      />
                    </div>

                    <div>
                      <Label>Answer Options</Label>
                      <div className="mt-2 space-y-2">
                        {currentQuestion.options.map((option, index) => (
                          <div key={index} className="flex items-center gap-2">
                            {currentQuestion.type === "SINGLE_CHOICE" && (
                              <RadioGroup
                                value={
                                  currentQuestion.correctAnswer?.toString() ||
                                  ""
                                }
                                onValueChange={(value) =>
                                  handleCorrectAnswerChange(
                                    Number.parseInt(value),
                                  )
                                }
                                className="flex items-center"
                              >
                                <RadioGroupItem
                                  value={index.toString()}
                                  id={`option-${index}`}
                                />
                              </RadioGroup>
                            )}

                            {currentQuestion.type === "MULTIPLE_CHOICE" && (
                              <Checkbox
                                id={`option-${index}`}
                                checked={currentQuestion.correctAnswers?.includes(
                                  index,
                                )}
                                onCheckedChange={(checked) =>
                                  handleMultipleCorrectChange(
                                    index,
                                    checked === true,
                                  )
                                }
                              />
                            )}

                            <Input
                              value={option}
                              onChange={(e) =>
                                handleOptionChange(index, e.target.value)
                              }
                              placeholder={`Option ${index + 1}`}
                              className="flex-1"
                            />

                            {currentQuestion.options.length > 2 && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeOption(index)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        ))}

                        <Button variant="outline" size="sm" onClick={addOption}>
                          <Plus className="mr-2 h-4 w-4" />
                          Add Option
                        </Button>
                      </div>

                      <div className="mt-2 text-sm text-gray-500">
                        {currentQuestion.type === "SINGLE_CHOICE" &&
                          "Select the radio button next to the correct answer."}
                        {currentQuestion.type === "MULTIPLE_CHOICE" &&
                          "Check all options that are correct answers."}
                      </div>
                    </div>

                    <Button
                      onClick={addQuestion}
                      disabled={!currentQuestion.question.trim()}
                      className="w-full"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Question
                    </Button>
                  </CardContent>
                </Card>

                {/* Question List */}
                <Card>
                  <CardHeader>
                    <CardTitle>Questions ({questions.length})</CardTitle>
                    <CardDescription>Drag to reorder questions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {questions.length === 0 ? (
                      <div className="rounded-lg border border-dashed py-8 text-center">
                        <AlertCircle className="mx-auto mb-3 h-12 w-12 text-gray-300" />
                        <p className="text-gray-500">No questions added yet</p>
                        <p className="text-sm text-gray-400">
                          Use the question builder above to add questions
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {questions.map((question, index) => (
                          <div
                            key={question.id}
                            className="cursor-move rounded-lg border bg-white p-4"
                            draggable
                            onDragStart={() => handleDragStart(index)}
                            onDragEnter={() => handleDragEnter(index)}
                            onDragEnd={handleDragEnd}
                            onDragOver={(e) => e.preventDefault()}
                          >
                            <div className="mb-2 flex items-start justify-between">
                              <div className="flex items-center gap-2">
                                <GripVertical className="h-5 w-5 text-gray-400" />
                                <Badge variant="outline">{index + 1}</Badge>
                                <Badge variant="secondary">
                                  {question.type}
                                </Badge>
                                <Badge>{question.points} pts</Badge>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeQuestion(question.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                            <p className="mb-2 text-sm font-medium">
                              {question.question}
                            </p>
                            <div className="space-y-1 text-xs text-gray-600">
                              {question.options.map((option, optIndex) => (
                                <div
                                  key={optIndex}
                                  className="flex items-center gap-2"
                                >
                                  {/* Show correct answer indicators */}
                                  {question.type === "SINGLE_CHOICE" &&
                                    question.correctAnswer === optIndex && (
                                      <Check className="h-3 w-3 text-green-500" />
                                    )}
                                  {question.type === "MULTIPLE_CHOICE" &&
                                    question.correctAnswers?.includes(
                                      optIndex,
                                    ) && (
                                      <Check className="h-3 w-3 text-green-500" />
                                    )}
                                  {((question.type === "SINGLE_CHOICE" &&
                                    question.correctAnswer !== optIndex) ||
                                    (question.type === "MULTIPLE_CHOICE" &&
                                      !question.correctAnswers?.includes(
                                        optIndex,
                                      ))) && <div className="w-3" />}
                                  <span>{option}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Time & Attempts
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="timeLimit">Time Limit (minutes)</Label>
                        <Input
                          id="timeLimit"
                          type="number"
                          value={timeLimit}
                          onChange={(e) => setTimeLimit(Number(e.target.value))}
                          min="0"
                          className="mb-1"
                        />
                        <p className="text-xs text-gray-500">
                          Set to 0 for no time limit
                        </p>
                      </div>
                      <div>
                        <Label htmlFor="attemptLimit">Attempt Limit</Label>
                        <Input
                          id="attemptLimit"
                          type="number"
                          value={attemptLimit}
                          onChange={(e) =>
                            setAttemptLimit(Number(e.target.value))
                          }
                          min="1"
                          className="mb-1"
                        />
                        <p className="text-xs text-gray-500">
                          How many times a user can take this quiz
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quiz Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Questions:</span>
                  <span className="font-medium">{questions.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Points:</span>
                  <span className="font-medium">{totalPoints}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Time Limit:</span>
                  <span className="font-medium">
                    {timeLimit > 0 ? `${timeLimit} min` : "None"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Attempt Limit:</span>
                  <span className="font-medium">{attemptLimit}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Visibility:</span>
                  <span className="font-medium capitalize">
                    {visibility.toLowerCase().replace("_", " ")}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Question Types</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <TooltipProvider>
                    <div className="flex items-center justify-between">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="flex items-center gap-2 text-sm">
                            <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                            Single Choice
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Questions with one correct answer</p>
                        </TooltipContent>
                      </Tooltip>
                      <span className="font-medium">
                        {
                          questions.filter((q) => q.type === "SINGLE_CHOICE")
                            .length
                        }
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="flex items-center gap-2 text-sm">
                            <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                            Multiple Choice
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Questions with multiple correct answers</p>
                        </TooltipContent>
                      </Tooltip>
                      <span className="font-medium">
                        {
                          questions.filter((q) => q.type === "MULTIPLE_CHOICE")
                            .length
                        }
                      </span>
                    </div>
                  </TooltipProvider>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  className="w-full"
                  onClick={() => saveQuiz(false)}
                  disabled={
                    !quizTitle ||
                    questions.length === 0 ||
                    postQuizMutation.isPending
                  }
                >
                  {postQuizMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create Quiz"
                  )}
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => saveQuiz(true)}
                  disabled={
                    !quizTitle ||
                    questions.length === 0 ||
                    postQuizMutation.isPending
                  }
                >
                  Create & Preview
                </Button>
              </CardContent>
            </Card>

            {postQuizMutation.isError && (
              <Card className="border-red-200 bg-red-50">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 text-red-800">
                    <AlertCircle className="h-5 w-5" />
                    <p>Failed to create quiz. Please try again.</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}
