import {
  useCreateSiteBuilderMutation,
  useGetOrgMeQuery,
} from "@/app/api/v0/organizations"
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
import { Link } from "react-router"
import { BarLoader } from "react-spinners"
import { toast } from "sonner"
import siteAssets from "./site-assets"
import { v4 as uuidv4 } from "uuid"

export const Site = () => {
  const { data, isLoading, refetch } = useGetOrgMeQuery()
  const [createSite, { isLoading: isLoadingSiteCreation }] =
    useCreateSiteBuilderMutation()

  const handleCreateSite = async () => {
    const orgId = data.data.id
    const body = {
      assets: siteAssets.assets,
      page: { ...siteAssets.page, id: uuidv4() },
    }
    try {
      const response = await createSite({ orgId, body }).unwrap()

      toast.success(response.message)
      refetch()

      window.open(
        `${window.location.origin}/organizations/site/builder`,
        "_blank",
      )
    } catch (error) {
      console.error(error)
    }
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
        <section className="flex gap-4">
          {isLoading ? (
            <Card className="w-full max-w-xs border">
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
            <>
              <Card className="max-w-xs border">
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
                  {data?.data?.site ? (
                    <div className="flex items-center justify-between gap-2">
                      <Link to={"builder"} target="_blank">
                        <Button>Start Editing</Button>
                      </Link>
                      <Link to={`/u/${data?.data?.orgUsername}/site`} target="_blank">
                        <Button variant={"outline"}>visit site </Button>
                      </Link>
                    </div>
                  ) : (
                    <Button
                      onClick={handleCreateSite}
                      className="mt-2"
                      disabled={isLoadingSiteCreation}
                    >
                      {isLoadingSiteCreation ? (
                        <BarLoader color="#fff" />
                      ) : (
                        <>Create now</>
                      )}
                    </Button>
                  )}
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>
                    Total Pages are ({data?.data?.site?.pages || 0})
                  </CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>
                    Total Images are ({data?.data?.site?.images || 0})
                  </CardTitle>
                </CardHeader>
              </Card>
            </>
          )}
        </section>
      </Layout.Body>
    </Layout>
  )
}
