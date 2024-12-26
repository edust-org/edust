import { useGetOrgMeQuery } from "@/app/api/v0/organizations"
import { NavbarRightMenus } from "@/components/navbar/navbar-right-menus"
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Skeleton,
} from "@/components/ui"
import { Layout } from "@/organizations/components/layout"
import { Helmet } from "react-helmet-async"
import { Link } from "react-router-dom"

export const Site = () => {
  const { data, isLoading } = useGetOrgMeQuery()
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
          {isLoading ? (
            <Card className="mb-6 max-w-xs border">
              <CardHeader>
                <CardTitle>
                  <Skeleton className="h-6" />
                </CardTitle>
                <CardDescription className="text-sm">
                  <Skeleton className="h-12" />
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Skeleton className="h-10 max-w-28" />
              </CardContent>
            </Card>
          ) : (
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
                {data.data?.site ? (
                  <Link to={"builder"} target="_blank">
                    <Button className="mt-2">Start Editing</Button>
                  </Link>
                ) : (
                  <Button className="mt-2">Create now</Button>
                )}
              </CardContent>
            </Card>
          )}
        </section>
      </Layout.Body>
    </Layout>
  )
}
