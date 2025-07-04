"use client"

import { AuthGuard, HasPermission, Layout } from "@/components"
import { useGetOrgMe, usePostOrganization } from "@/hooks/react-query"
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Skeleton,
} from "@edust/ui"
import Link from "next/link"
import { useParams } from "next/navigation"
import { BarLoader } from "react-spinners"
import { toast } from "sonner"
import { v4 as uuidv4 } from "uuid"

import siteAssets from "./site-assets"

export default function Site() {
  const { orgUsername } = useParams<{ orgUsername: string }>()
  const { data, isLoading, refetch } = useGetOrgMe()
  const { mutateAsync: createSite, isPending: isLoadingSiteCreation } =
    usePostOrganization()

  const handleCreateSite = async () => {
    const orgId = data?.data.id
    const body = {
      assets: siteAssets.assets,
      page: { ...siteAssets.page, id: uuidv4() },
    }
    try {
      const response = await createSite({ orgId, body })

      toast.success(response.message)
      refetch()

      window.open(
        `${window.location.origin}/orgs/${orgUsername}/site/builder`,
        "_blank",
      )
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <AuthGuard requiredPermissions="org:menu:site">
      <Layout>
        <title>Site Status</title>
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
                      Easily customize and build a unique static site to fit
                      your needs.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {data?.data?.site ? (
                      <div className="flex items-center justify-between gap-2">
                        <Link href={"site/builder"} target="_blank">
                          <Button>Start Editing</Button>
                        </Link>
                        <Link
                          href={`/orgs/${orgUsername}/profile/${data?.data?.orgUsername}/site`}
                          target="_blank"
                        >
                          <Button variant={"outline"}>visit site </Button>
                        </Link>
                      </div>
                    ) : (
                      <HasPermission
                        requiredPermissions={"org:site_builder:create"}
                        fallback
                      >
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
                      </HasPermission>
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
    </AuthGuard>
  )
}
