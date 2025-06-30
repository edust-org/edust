"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useSession } from "next-auth/react"
import { quizHooks } from "@/hooks/quiz-hooks"
import {
  BookOpen,
  BarChart3,
  Search,
  Plus,
  Eye,
  Edit,
  Share2,
  Download,
  Globe,
  Lock,
  Building,
  Timer,
} from "lucide-react"
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Badge,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Typography,
} from "@edust/ui"
import { Layout } from "../../components/layout"

export default function QuizzesDemo() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const { data: session } = useSession()
  const params = useParams()
  const orgId = params?.orgId as string

  const { data, isLoading } = quizHooks.useGetQuizzes(orgId)
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
        return <Globe className="w-4 h-4 text-blue-600" />
      case "organization":
        return <Building className="w-4 h-4 text-purple-600" />
      case "private":
        return <Lock className="w-4 h-4 text-gray-600" />
      default:
        return null
    }
  }

  return (
    <>
      <Layout.Header>
        <div className="flex items-center justify-between w-full">
          <Typography variant="h1">Quizzes</Typography>
          <Link href={`/orgs/${orgId}/quizzes/create`}>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Quiz
            </Button>
          </Link>
        </div>
      </Layout.Header>

      <div className="container mx-auto px-4 py-6 space-y-6">
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

        {isLoading ? (
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
        ) : filteredQuizzes.length === 0 ? (
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
            {filteredQuizzes.map((quiz) => (
              <Card
                key={quiz.id}
                className="hover:shadow-lg transition-shadow border-l-4 border-l-blue-500"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2 line-clamp-1">
                        {quiz.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2 mb-3">
                        {quiz.description || "No description provided"}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600">{quiz.questionCount} Questions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Timer className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600">
                        {quiz.timeLimit ? `${quiz.timeLimit}m` : "No limit"}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Link href={`/orgs/${orgId}/quizzes/${quiz.id}/view`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                    </Link>
                    <Link href={`/orgs/${orgId}/quizzes/${quiz.id}/edit`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                    </Link>


                    <Link href={`/quiz/results/${quiz.id}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        <BarChart3 className="w-4 h-4 mr-1" />
                        Results
                      </Button>
                    </Link>
                  </div>
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
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
