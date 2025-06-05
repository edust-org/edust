import { Badge } from "@edust/ui"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@edust/ui"
import { defaultValues } from "@/configs"
import { format } from "date-fns"
import { HelpCircle } from "lucide-react"
import Link from "next/link"

import { SearchArticle } from "./components/search-article"

export default async function Help({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>
}) {
  const params = await searchParams

  const response = await fetch(
    `${defaultValues.backendURL}/api/v0/public/help-center`,
  )
  const data = await response.json()
  const articles = data?.data.items

  return (
    <>
      <div className="bg-muted min-h-screen">
        {/* Hero Section */}
        <div className="bg-primary/5 py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <HelpCircle className="text-primary mx-auto mb-6 h-16 w-16" />
              <h1 className="mb-4 text-4xl font-bold">How can we help you?</h1>
              <p className="text-muted-foreground mb-8">
                Search our knowledge base or browse all help articles below
              </p>
              {/* <SearchArticle /> */}
            </div>
          </div>
        </div>

        {/* Articles Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <Card
                key={article.id}
                className="transition-shadow hover:shadow-lg"
              >
                <CardHeader>
                  <div className="mb-2 flex items-center justify-between">
                    <Badge>Published</Badge>
                    <span className="text-muted-foreground text-sm">
                      Updated {format(article.updatedAt, "MMM d, yyyy")}
                    </span>
                  </div>
                  <CardTitle className="hover:text-primary text-xl">
                    <Link href={`/help-center/${article.id}`}>
                      {article.title}
                    </Link>
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {article.content}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
