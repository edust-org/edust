"use client"

import { SetStateAction, useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "../../../../../../../packages/ui/src/components/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../../../../../packages/ui/src/components/card"
import { Badge } from "../../../../../../../packages/ui/src/components/badge"
import { Input } from "../../../../../../../packages/ui/src/components/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../../../../packages/ui/src/components/select"
import {
  BookOpen,
  BarChart3,
  Search,
  Plus,
  Eye,
  Edit,
  Share2,
  Download,
  Users,
  Globe,
  Lock,
  Building,
  Timer,
  CheckCircle2,
} from "lucide-react"
// import { ApiClient } from "@/lib/api-client"
import { Layout } from "../components/layout"
import { Typography } from "../../../../../../../packages/ui/src/components/typography"
interface Quiz {
  _id: string
  title: string
  description?: string
  status: "draft" | "active" | "archived"
  visibility: "public" | "organization" | "private"
  settings: {
    timeLimit: number
    maxAttempts: number
    shuffleQuestions: boolean
    showResults: boolean
  }
  analytics: {
    totalAttempts: number
    completedAttempts: number
    averageScore: number
  }
  createdAt: string
  questionCount: number
}

// Demo data
const demoQuizzes: Quiz[] = [
  {
    _id: "1",
    title: "JavaScript Fundamentals",
    description: "Test your knowledge of JavaScript basics including variables, functions, and control structures.",
    status: "active",
    visibility: "public",
    settings: {
      timeLimit: 30,
      maxAttempts: 3,
      shuffleQuestions: true,
      showResults: true,
    },
    analytics: {
      totalAttempts: 245,
      completedAttempts: 198,
      averageScore: 78.5,
    },
    createdAt: "2024-01-15T10:30:00Z",
    questionCount: 15,
  },
  {
    _id: "2",
    title: "React Hooks Deep Dive",
    description: "Advanced concepts in React Hooks including useState, useEffect, useContext, and custom hooks.",
    status: "active",
    visibility: "organization",
    settings: {
      timeLimit: 45,
      maxAttempts: 2,
      shuffleQuestions: false,
      showResults: true,
    },
    analytics: {
      totalAttempts: 89,
      completedAttempts: 76,
      averageScore: 85.2,
    },
    createdAt: "2024-02-20T14:15:00Z",
    questionCount: 20,
  },
  {
    _id: "3",
    title: "Database Design Principles",
    description: "Understanding relational database design, normalization, and SQL optimization techniques.",
    status: "draft",
    visibility: "private",
    settings: {
      timeLimit: 60,
      maxAttempts: 1,
      shuffleQuestions: true,
      showResults: false,
    },
    analytics: {
      totalAttempts: 0,
      completedAttempts: 0,
      averageScore: 0,
    },
    createdAt: "2024-03-10T09:45:00Z",
    questionCount: 25,
  },
  {
    _id: "4",
    title: "Python for Data Science",
    description: "Essential Python libraries and techniques for data analysis including pandas, numpy, and matplotlib.",
    status: "active",
    visibility: "public",
    settings: {
      timeLimit: 0,
      maxAttempts: 0,
      shuffleQuestions: true,
      showResults: true,
    },
    analytics: {
      totalAttempts: 156,
      completedAttempts: 134,
      averageScore: 72.8,
    },
    createdAt: "2024-01-28T16:20:00Z",
    questionCount: 18,
  },
  {
    _id: "5",
    title: "Web Security Fundamentals",
    description: "Learn about common web vulnerabilities, security best practices, and protection mechanisms.",
    status: "archived",
    visibility: "organization",
    settings: {
      timeLimit: 40,
      maxAttempts: 2,
      shuffleQuestions: false,
      showResults: true,
    },
    analytics: {
      totalAttempts: 67,
      completedAttempts: 58,
      averageScore: 81.3,
    },
    createdAt: "2023-12-05T11:10:00Z",
    questionCount: 22,
  },
  {
    _id: "6",
    title: "Machine Learning Basics",
    description: "Introduction to machine learning concepts, algorithms, and practical applications.",
    status: "active",
    visibility: "public",
    settings: {
      timeLimit: 50,
      maxAttempts: 3,
      shuffleQuestions: true,
      showResults: true,
    },
    analytics: {
      totalAttempts: 312,
      completedAttempts: 287,
      averageScore: 69.4,
    },
    createdAt: "2024-02-14T13:30:00Z",
    questionCount: 30,
  },
]

export default function QuizzesDemo() {
  const [quizzes, setQuizzes] = useState<Quiz[]>(demoQuizzes)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Filter quizzes based on search and status
    let filtered = demoQuizzes

    if (searchTerm) {
      filtered = filtered.filter(
        (quiz) =>
          quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          quiz.description?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((quiz) => quiz.status === statusFilter)
    }

    setQuizzes(filtered)
  }, [searchTerm, statusFilter])

  const getVisibilityIcon = (visibility: string) => {
    switch (visibility) {
      case "public":
        return <Globe className="w-4 h-4 text-blue-600" />
      case "organization":
        return <Building className="w-4 h-4 text-purple-600" />
      case "private":
        return <Lock className="w-4 h-4 text-gray-600" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "draft":
        return "bg-yellow-100 text-yellow-800"
      case "archived":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <>
      <Layout.Header>
        <div className="flex items-center justify-between w-full">
          <Typography variant="h1">Quizzes Demo</Typography>
          <Link href="quizzes/create">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Quiz
            </Button>
          </Link>
        </div>
      </Layout.Header>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Demo Notice */}
        

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search quizzes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Quiz Cards Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-200 rounded"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : quizzes.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <BookOpen className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <Typography variant="h3" className="mb-2">
                No quizzes found
              </Typography>
              <Typography variant="anchor" className="mb-4">
                Try adjusting your search or filter criteria
              </Typography>
              <Button
                onClick={() => {
                  setSearchTerm("")
                  setStatusFilter("all")
                }}
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes.map((quiz) => (
              <Card key={quiz._id} className="hover:shadow-lg transition-shadow border-l-4 border-l-blue-500">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2 line-clamp-1">{quiz.title}</CardTitle>
                      <CardDescription className="line-clamp-2 mb-3">
                        {quiz.description || "No description provided"}
                      </CardDescription>
                    </div>
                  </div>

                  {/* Status and Visibility Badges */}
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(quiz.status)}>
                      {quiz.status.charAt(0).toUpperCase() + quiz.status.slice(1)}
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      {getVisibilityIcon(quiz.visibility)}
                      <span className="capitalize">{quiz.visibility}</span>
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Quiz Details */}
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600">{quiz.questionCount} Questions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Timer className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600">
                        {quiz.settings.timeLimit ? `${quiz.settings.timeLimit}m` : "No limit"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600">{quiz.analytics.totalAttempts} Attempts</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600">
                        {quiz.analytics.averageScore > 0 ? `${quiz.analytics.averageScore.toFixed(1)}%` : "No scores"}
                      </span>
                    </div>
                  </div>

                  {/* Quiz Settings */}
                  <div className="flex flex-wrap gap-2 text-xs">
                    {quiz.settings.maxAttempts > 0 && (
                      <Badge variant="secondary">Max {quiz.settings.maxAttempts} attempts</Badge>
                    )}
                    {quiz.settings.shuffleQuestions && <Badge variant="secondary">Shuffled</Badge>}
                    {quiz.settings.showResults && <Badge variant="secondary">Show results</Badge>}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <BarChart3 className="w-4 h-4 mr-1" />
                      Results
                    </Button>
                  </div>

                  {/* Additional Actions */}
                  <div className="flex gap-2 pt-1">
                    <Button variant="ghost" size="sm" className="flex-1">
                      <Share2 className="w-4 h-4 mr-1" />
                      Share
                    </Button>
                    <Button variant="ghost" size="sm" className="flex-1">
                      <Download className="w-4 h-4 mr-1" />
                      Export
                    </Button>
                  </div>

                  {/* Creation Date */}
                  <div className="text-xs text-gray-500 pt-2 border-t">
                    Created {new Date(quiz.createdAt).toLocaleDateString()}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Stats Summary */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Demo Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">{demoQuizzes.length}</div>
                <div className="text-sm text-gray-600">Total Quizzes</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {demoQuizzes.filter((q) => q.status === "active").length}
                </div>
                <div className="text-sm text-gray-600">Active</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-600">
                  {demoQuizzes.filter((q) => q.status === "draft").length}
                </div>
                <div className="text-sm text-gray-600">Drafts</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">
                  {demoQuizzes.reduce((sum, q) => sum + q.analytics.totalAttempts, 0)}
                </div>
                <div className="text-sm text-gray-600">Total Attempts</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
