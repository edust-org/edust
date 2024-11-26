import { useGetSiteBuilderMeQuery } from "@/app/api/v0/organizations"
import Loading from "@/components/loading"
import { NavbarRightMenus } from "@/components/navbar/navbar-right-menus"
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
} from "@/components/ui"
import { Layout } from "@/organizations/components/layout"
import { useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"
import { Link } from "react-router-dom"

export const Site = () => {
  const { data, isLoading } = useGetSiteBuilderMeQuery()
  const [pages, setPages] = useState<[]>([])

  useEffect(() => {
    if (data?.data?.pages) {
      setPages(JSON.parse(data?.data?.pages))
    }
  }, [data?.data?.pages])

  if (isLoading) {
    return <Loading.Spinner />
  }

  return (
    <Layout>
      <Helmet>
        <title>Site Builder | Edust</title>
        <meta
          name="description"
          content="Edust is a powerful and flexible platform for building and managing websites."
        />
        <meta property="og:title" content="Site Builder | Edust" />
        <meta
          property="og:description"
          content="Edust is a powerful and flexible platform for building and managing websites."
        />
      </Helmet>
      <Layout.Header className="">
        <div className="ml-auto flex items-center space-x-4">
          <Input
            type="search"
            placeholder="Search..."
            className="md:w-[100px] lg:w-[300px]"
          />
          <NavbarRightMenus />
        </div>
      </Layout.Header>

      <Layout.Body>
        <section>
          <Card className="mb-6 max-w-xs border">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">
                Make Your Site Your Own
              </CardTitle>
              <CardDescription className="text-sm">
                Easily customize and build a unique static site to fit your
                needs.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to={"builder"} target="_blank">
                <Button className="mt-2">Start Editing</Button>
              </Link>
            </CardContent>
          </Card>
        </section>
      </Layout.Body>
    </Layout>
  )
}
