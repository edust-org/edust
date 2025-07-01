"use client"

import { Layout } from "@/components"
import { quizHooks } from "@/hooks/quiz-hooks"
import { useAuthStore } from "@/store"
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Typography,
} from "@edust/ui"
import {
  BarChart3,
  BookOpen,
  Building,
  Download,
  Edit,
  Eye,
  Globe,
  Lock,
  Plus,
  Search,
  Share2,
  Timer,
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { toast } from "sonner"

import { useMemo, useState } from "react"

export default function Quizzes() {
  const state = useAuthStore()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const { orgUsername } = useParams<{ orgUsername: string }>()
  const org = state.getActiveOrg()

  const { data, isLoading } = quizHooks.useGetQuizzes(org?.id || null)
  const quizzes = data?.data?.items || []

  const validQuizzes = useMemo(() => {
    if (!Array.isArray(quizzes)) {
      console.warn("Expected quizzes to be an array but got:", quizzes)
      return []
    }

    return quizzes.filter((q, index) => {
      const isValid = typeof q?.title === "string"
      if (!isValid) {
        console.warn(`Invalid quiz at index ${index}:`, q)
      }
      return isValid
    })
  }, [quizzes])

  const filteredQuizzes = useMemo(() => {
    const lowerSearchTerm = searchTerm.toLowerCase()
    const lowerStatusFilter = statusFilter.toLowerCase()

    return validQuizzes.filter((quiz) => {
      const title = quiz.title?.toLowerCase() || ""
      const description = quiz.description?.toLowerCase() || ""
      const status = quiz.status?.toLowerCase() || ""

      const matchesSearch =
        title.includes(lowerSearchTerm) || description.includes(lowerSearchTerm)
      const matchesStatus =
        lowerStatusFilter === "all" || status === lowerStatusFilter

      return matchesSearch && matchesStatus
    })
  }, [validQuizzes, searchTerm, statusFilter])

  const getVisibilityIcon = (visibility: string) => {
    switch (visibility?.toLowerCase()) {
      case "public":
        return <Globe className="h-4 w-4 text-blue-600" />
      case "organization":
        return <Building className="h-4 w-4 text-purple-600" />
      case "private":
        return <Lock className="h-4 w-4 text-gray-600" />
      default:
        return null
    }
  }

  return (
    <Layout>
      <Layout.Header>
        <div className="flex w-full items-center justify-between">
          <Typography variant="h1">Quizzes</Typography>
          <Link href={`/orgs/${orgUsername}/quizzes/create`}>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Quiz
            </Button>
          </Link>
        </div>
      </Layout.Header>

      <div className="container mx-auto space-y-6 px-4 py-6">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="max-w-md flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
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

        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-4 w-3/4 rounded bg-gray-200"></div>
                  <div className="h-3 w-1/2 rounded bg-gray-200"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-3 rounded bg-gray-200"></div>
                    <div className="h-3 w-2/3 rounded bg-gray-200"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredQuizzes.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <BookOpen className="mx-auto mb-4 h-12 w-12 text-gray-400" />
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
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredQuizzes.map((quiz) => (
              <Card
                key={quiz.id}
                className="border-l-4 border-l-blue-500 transition-shadow hover:shadow-lg"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="mb-2 line-clamp-1 text-lg">
                        {quiz.title}
                      </CardTitle>
                      <CardDescription className="mb-3 line-clamp-2">
                        {quiz.description || "No description provided"}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2"></div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-600">
                        {quiz.questionCount} Questions
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Timer className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-600">
                        {quiz.timeLimit ? `${quiz.timeLimit}m` : "No limit"}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Link
                      href={`/orgs/${orgUsername}/quizzes/${quiz.id}/view`}
                      className="flex-1"
                    >
                      <Button variant="outline" size="sm" className="w-full">
                        <Eye className="mr-1 h-4 w-4" />
                        View
                      </Button>
                    </Link>
                    <Link
                      href={`/orgs/${orgUsername}/quizzes/${quiz.id}/edit`}
                      className="flex-1"
                    >
                      <Button variant="outline" size="sm" className="w-full">
                        <Edit className="mr-1 h-4 w-4" />
                        Edit
                      </Button>
                    </Link>

                    <Link href={`/quiz/results/${quiz.id}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        <BarChart3 className="mr-1 h-4 w-4" />
                        Results
                      </Button>
                    </Link>
                  </div>
                  <div className="flex gap-2 pt-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex-1"
                      onClick={() => {
                        navigator.clipboard.writeText(
                          `${window.origin}/student/orgs/${orgUsername}/quizzes/${quiz.id}/attempt`,
                        )
                        toast.success("Share link copied to clipboard")
                      }}
                    >
                      <Share2 className="mr-1 h-4 w-4" />
                      Share
                    </Button>
                    <Button variant="ghost" size="sm" className="flex-1">
                      <Download className="mr-1 h-4 w-4" />
                      Export
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  )
}
