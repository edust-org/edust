import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { defaultValues } from "@/configs"
import { format } from "date-fns"
import { Clock } from "lucide-react"

import { BackButton } from "./back-button"

export default async function HelpCenterDetails({
  params,
}: {
  params: Promise<{ articleId: string }>
}) {
  const articleId = (await params).articleId
  const response = await fetch(
    `${defaultValues.backendURL}/api/v0/public/help-center/${articleId}`,
  )
  const data = await response.json()
  const article = data?.data

  return (
    <div className="bg-background min-h-screen py-12">
      <div className="container mx-auto px-4">
        <BackButton />

        <Card className="mx-auto max-w-4xl">
          <CardContent className="pt-6">
            <div className="mb-6 flex items-center justify-between">
              <Badge>Published</Badge>
              <div className="text-muted-foreground flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>
                    Updated {format(article.updatedAt, "MMM d, yyyy")}
                  </span>
                </div>
              </div>
            </div>

            <h1 className="mb-8 text-3xl font-bold">{article.title}</h1>

            <div
              className="prose prose-slate max-w-none"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
