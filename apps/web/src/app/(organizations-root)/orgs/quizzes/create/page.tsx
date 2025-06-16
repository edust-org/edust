"use client"

import { useState, useRef, SetStateAction } from "react"
import { Button, Typography } from "@edust/ui"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@edust/ui"
import { Input } from "@edust/ui"
import { Label } from "../../../../../../../../packages/ui/src/components/label"
import { Textarea } from "../../../../../../../../packages/ui/src/components/textarea"
import { Switch } from "../../../../../../../../packages/ui/src/components/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../../../../../../packages/ui/src/components/tabs"
import { Badge } from "../../../../../../../../packages/ui/src/components/badge"
import {
  Trash2,
  Clock,
  BookOpen,
  Save,
  GripVertical,
  Plus,
  Check,
  Globe,
  Building2,
  Lock,
  AlertCircle,
  ArrowLeft,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../../../../../packages/ui/src/components/select"
import { RadioGroup, RadioGroupItem } from "../../../../../../../../packages/ui/src/components/radio-group"
import { Checkbox } from "../../../../../../../../packages/ui/src/components/checkbox"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../../../../../../../packages/ui/src/components/tooltip"
import Link from "next/link"
import { Layout } from "../../components/layout"


interface Question {
  id: string
  type: "single-choice" | "multiple-choice"
  question: string
  options: string[]
  correctAnswers?: number[] 
  correctAnswer?: number 
  points: number
  required: boolean
}

export default function CreateQuizPage() {
  // Quiz metadata
  const [quizTitle, setQuizTitle] = useState("")
  const [quizDescription, setQuizDescription] = useState("")
  const [visibility, setVisibility] = useState<"public" | "organization" | "private">("organization")

  // Quiz settings
  const [timeLimit, setTimeLimit] = useState(30)
  const [maxAttempts, setMaxAttempts] = useState(1)
  const [shuffleQuestions, setShuffleQuestions] = useState(false)
  const [shuffleOptions, setShuffleOptions] = useState(false)
  const [showResults, setShowResults] = useState("always")
  const [passingScore, setPassingScore] = useState(60)
  const [allowReview, setAllowReview] = useState(true)

  // Questions
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestion, setCurrentQuestion] = useState<Question>({
    id: "",
    type: "single-choice",
    question: "",
    options: ["", ""],
    correctAnswer: undefined,
    points: 1,
    required: true,
  })

  // Drag and drop
  const dragItem = useRef<number | null>(null)
  const dragOverItem = useRef<number | null>(null)

  // Save status
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle")

  // Add a new question
  const addQuestion = () => {
    if (!currentQuestion.question.trim()) {
      return
    }

    // Validate that at least one option is filled and correct answer is selected
    const filledOptions = currentQuestion.options.filter((opt) => opt.trim())
    if (filledOptions.length < 2) {
      alert("Please provide at least 2 answer options")
      return
    }

    if (currentQuestion.type === "single-choice" && currentQuestion.correctAnswer === undefined) {
      alert("Please select the correct answer")
      return
    }

    if (
      currentQuestion.type === "multiple-choice" &&
      (!currentQuestion.correctAnswers || currentQuestion.correctAnswers.length === 0)
    ) {
      alert("Please select at least one correct answer")
      return
    }

    const newQuestion = {
      ...currentQuestion,
      options: filledOptions, // Only save filled options
    }

    setQuestions([...questions, newQuestion])

    // Reset current question form
    setCurrentQuestion({
      id: "",
      type: "single-choice",
      question: "",
      options: ["", ""],
      correctAnswer: undefined,
      points: 1,
      required: true,
    })
  }

  // Remove a question
  const removeQuestion = (id: string) => {
    setQuestions(questions.filter((q) => q.id !== id))
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

      // Add type check to ensure draggedItem exists
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
    if (currentQuestion.type === "single-choice") {
      let correctAnswer = currentQuestion.correctAnswer
      if (correctAnswer !== undefined && correctAnswer >= index) {
        correctAnswer = correctAnswer > index ? correctAnswer - 1 : undefined
      }
      setCurrentQuestion({ ...currentQuestion, options: newOptions, correctAnswer })
    } else if (currentQuestion.type === "multiple-choice") {
      let correctAnswers = [...(currentQuestion.correctAnswers || [])]
      correctAnswers = correctAnswers.filter((i) => i !== index).map((i) => (i > index ? i - 1 : i))
      setCurrentQuestion({ ...currentQuestion, options: newOptions, correctAnswers })
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
      options: currentQuestion.options.length ? currentQuestion.options : ["", ""],
    }

    if (type === "single-choice") {
      updatedQuestion.correctAnswer = undefined
      delete updatedQuestion.correctAnswers
    } else {
      updatedQuestion.correctAnswers = []
      delete updatedQuestion.correctAnswer
    }

    setCurrentQuestion(updatedQuestion)
  }

  // Save the quiz
  const saveQuiz = async (preview = false) => {
    if (!quizTitle || questions.length === 0) return

    setSaveStatus("saving")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Create quiz data object
      const quizData = {
        title: quizTitle,
        description: quizDescription,
        visibility,
        settings: {
          timeLimit,
          maxAttempts,
          shuffleQuestions,
          shuffleOptions,
          showResults,
          passingScore,
          allowReview,
        },
        questions,
      }

      // Store in localStorage for demo purposes (in real app, this would be API call)
      localStorage.setItem(`quiz_demo_${Date.now()}`, JSON.stringify(quizData))
      localStorage.setItem("lastCreatedQuiz", JSON.stringify(quizData))

      console.log("Quiz saved:", quizData)
      setSaveStatus("saved")

      // If preview is requested, redirect to preview page
      if (preview) {
        window.open(`/quiz/preview/demo`, "_blank")
      }

      // Reset after a delay
      setTimeout(() => setSaveStatus("idle"), 3000)
    } catch (error) {
      console.error("Error saving quiz:", error)
      setSaveStatus("error")
    }
  }

  const totalPoints = questions.reduce((sum, q) => sum + q.points, 0)

  return (
    <>
      <Layout.Header>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-4">
            <Link href="/orgs/quizzes">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Quizzes
              </Button>
            </Link>
            <Typography variant="h1">Create Quiz</Typography>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => saveQuiz(true)} disabled={!quizTitle || questions.length === 0}>
              Preview
            </Button>
            <Button
              onClick={() => saveQuiz(false)}
              disabled={!quizTitle || questions.length === 0 || saveStatus === "saving"}
            >
              {saveStatus === "saving" ? (
                <>Saving...</>
              ) : saveStatus === "saved" ? (
                <>
                  <Check className="w-4 h-4 mr-2" /> Saved
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" /> Save Quiz
                </>
              )}
            </Button>
          </div>
        </div>
      </Layout.Header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
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
                  <p className="text-xs text-gray-500">Give your quiz a clear, descriptive title</p>
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
                  <p className="text-xs text-gray-500">Provide context and instructions for quiz takers</p>
                </div>

                <div>
                  <Label htmlFor="visibility">Visibility</Label>
                  <Select
                    value={visibility}
                    onValueChange={(value: "public" | "organization" | "private") => setVisibility(value)}
                  >
                    <SelectTrigger id="visibility" className="mb-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">
                        <div className="flex items-center">
                          <Globe className="w-4 h-4 mr-2" />
                          <span>Public - Anyone with the link</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="organization">
                        <div className="flex items-center">
                          <Building2 className="w-4 h-4 mr-2" />
                          <span>Organization - Members only</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="private">
                        <div className="flex items-center">
                          <Lock className="w-4 h-4 mr-2" />
                          <span>Private - Specific users only</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500">Control who can access your quiz</p>
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
                    <CardDescription>Build your question with the options below</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="questionType">Question Type</Label>
                        <Select
                          value={currentQuestion.type}
                          onValueChange={(value: Question["type"]) => handleQuestionTypeChange(value)}
                        >
                          <SelectTrigger id="questionType">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="single-choice">Single Choice</SelectItem>
                            <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="points">Points</Label>
                        <Input
                          id="points"
                          type="number"
                          value={currentQuestion.points}
                          onChange={(e) => setCurrentQuestion({ ...currentQuestion, points: Number(e.target.value) })}
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
                        onChange={(e) => setCurrentQuestion({ ...currentQuestion, question: e.target.value })}
                        placeholder="Enter your question..."
                        rows={2}
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="required"
                        checked={currentQuestion.required}
                        onCheckedChange={(checked) =>
                          setCurrentQuestion({ ...currentQuestion, required: checked === true })
                        }
                      />
                      <label
                        htmlFor="required"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Required question
                      </label>
                    </div>

                    <div>
                      <Label>Answer Options</Label>
                      <div className="space-y-2 mt-2">
                        {currentQuestion.options.map((option, index) => (
                          <div key={index} className="flex items-center gap-2">
                            {currentQuestion.type === "single-choice" && (
                              <RadioGroup
                                value={currentQuestion.correctAnswer?.toString() || ""}
                                onValueChange={(value) => handleCorrectAnswerChange(Number.parseInt(value))}
                                className="flex items-center"
                              >
                                <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                              </RadioGroup>
                            )}

                            {currentQuestion.type === "multiple-choice" && (
                              <Checkbox
                                id={`option-${index}`}
                                checked={currentQuestion.correctAnswers?.includes(index)}
                                onCheckedChange={(checked) => handleMultipleCorrectChange(index, checked === true)}
                              />
                            )}

                            <Input
                              value={option}
                              onChange={(e) => handleOptionChange(index, e.target.value)}
                              placeholder={`Option ${index + 1}`}
                              className="flex-1"
                            />

                            {currentQuestion.options.length > 2 && (
                              <Button variant="ghost" size="sm" onClick={() => removeOption(index)}>
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        ))}

                        <Button variant="outline" size="sm" onClick={addOption}>
                          <Plus className="w-4 h-4 mr-2" />
                          Add Option
                        </Button>
                      </div>

                      <div className="mt-2 text-sm text-gray-500">
                        {currentQuestion.type === "single-choice" &&
                          "Select the radio button next to the correct answer."}
                        {currentQuestion.type === "multiple-choice" && "Check all options that are correct answers."}
                      </div>
                    </div>

                    <Button onClick={addQuestion} disabled={!currentQuestion.question.trim()} className="w-full">
                      <Plus className="w-4 h-4 mr-2" />
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
                      <div className="text-center py-8 border border-dashed rounded-lg">
                        <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500">No questions added yet</p>
                        <p className="text-sm text-gray-400">Use the question builder above to add questions</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {questions.map((question, index) => (
                          <div
                            key={question.id}
                            className="border rounded-lg p-4 bg-white cursor-move"
                            draggable
                            onDragStart={() => handleDragStart(index)}
                            onDragEnter={() => handleDragEnter(index)}
                            onDragEnd={handleDragEnd}
                            onDragOver={(e) => e.preventDefault()}
                          >
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <GripVertical className="w-5 h-5 text-gray-400" />
                                <Badge variant="outline">{index + 1}</Badge>
                                <Badge variant="secondary">{question.type}</Badge>
                                <Badge>{question.points} pts</Badge>
                                {question.required && <Badge variant="destructive">Required</Badge>}
                              </div>
                              <Button variant="ghost" size="sm" onClick={() => removeQuestion(question.id)}>
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                            <p className="text-sm font-medium mb-2">{question.question}</p>
                            <div className="text-xs text-gray-600 space-y-1">
                              {question.options.map((option, optIndex) => (
                                <div key={optIndex} className="flex items-center gap-2">
                                  {/* Show correct answer indicators */}
                                  {question.type === "single-choice" && question.correctAnswer === optIndex && (
                                    <Check className="w-3 h-3 text-green-500" />
                                  )}
                                  {question.type === "multiple-choice" &&
                                    question.correctAnswers?.includes(optIndex) && (
                                      <Check className="w-3 h-3 text-green-500" />
                                    )}
                                  {((question.type === "single-choice" && question.correctAnswer !== optIndex) ||
                                    (question.type === "multiple-choice" &&
                                      !question.correctAnswers?.includes(optIndex))) && <div className="w-3" />}
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
                      <Clock className="w-5 h-5" />
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
                        <p className="text-xs text-gray-500">Set to 0 for no time limit</p>
                      </div>
                      <div>
                        <Label htmlFor="maxAttempts">Max Attempts</Label>
                        <Input
                          id="maxAttempts"
                          type="number"
                          value={maxAttempts}
                          onChange={(e) => setMaxAttempts(Number(e.target.value))}
                          min="1"
                          className="mb-1"
                        />
                        <p className="text-xs text-gray-500">How many times a user can take this quiz</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Display Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="shuffleQuestions">Shuffle Questions</Label>
                          <p className="text-sm text-gray-600">Randomize question order for each participant</p>
                        </div>
                        <Switch
                          id="shuffleQuestions"
                          checked={shuffleQuestions}
                          onCheckedChange={setShuffleQuestions}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="shuffleOptions">Shuffle Answer Options</Label>
                          <p className="text-sm text-gray-600">Randomize the order of answer choices</p>
                        </div>
                        <Switch id="shuffleOptions" checked={shuffleOptions} onCheckedChange={setShuffleOptions} />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="allowReview">Allow Answer Review</Label>
                          <p className="text-sm text-gray-600">
                            Let participants review their answers before submission
                          </p>
                        </div>
                        <Switch id="allowReview" checked={allowReview} onCheckedChange={setAllowReview} />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Results Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label htmlFor="showResults">Show Results</Label>
                      <Select value={showResults} onValueChange={setShowResults}>
                        <SelectTrigger id="showResults" className="mb-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="always">Always show results</SelectItem>
                          <SelectItem value="passing">Only if passing score achieved</SelectItem>
                          <SelectItem value="never">Never show detailed results</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-gray-500">Control when participants can see their detailed results</p>
                    </div>

                    <div>
                      <Label htmlFor="passingScore">Passing Score (%)</Label>
                      <Input
                        id="passingScore"
                        type="number"
                        value={passingScore}
                        onChange={(e) => setPassingScore(Number(e.target.value))}
                        min="0"
                        max="100"
                        className="mb-1"
                      />
                      <p className="text-xs text-gray-500">Minimum percentage required to pass the quiz</p>
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
                  <span className="font-medium">{timeLimit > 0 ? `${timeLimit} min` : "None"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Max Attempts:</span>
                  <span className="font-medium">{maxAttempts}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Visibility:</span>
                  <span className="font-medium capitalize">{visibility}</span>
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
                          <span className="text-sm flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                            Single Choice
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Questions with one correct answer</p>
                        </TooltipContent>
                      </Tooltip>
                      <span className="font-medium">{questions.filter((q) => q.type === "single-choice").length}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="text-sm flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                            Multiple Choice
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Questions with multiple correct answers</p>
                        </TooltipContent>
                      </Tooltip>
                      <span className="font-medium">
                        {questions.filter((q) => q.type === "multiple-choice").length}
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
                  disabled={!quizTitle || questions.length === 0 || saveStatus === "saving"}
                >
                  {saveStatus === "saving" ? "Saving..." : "Save Quiz"}
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => saveQuiz(true)}
                  disabled={!quizTitle || questions.length === 0}
                >
                  Preview Quiz
                </Button>
              </CardContent>
            </Card>

            {saveStatus === "error" && (
              <Card className="border-red-200 bg-red-50">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 text-red-800">
                    <AlertCircle className="w-5 h-5" />
                    <p>Failed to save quiz. Please try again.</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
