import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
  Skeleton,
  Typography,
} from "@/components/ui"
import { useGetOrgLists } from "@/hooks/react-query"
import { format } from "date-fns"
import Link from "next/link"

export const OrgLists = () => {
  const { data, isLoading } = useGetOrgLists()

  return (
    <div className="container mx-auto grid max-w-lg grid-cols-1 items-center justify-center gap-6">
      {/* <title>Home - Edust</title>
        <meta name="description" content="Edust - Organizations" />
        <meta property="og:title" content="Home - Edust" />
        <meta property="og:description" content="Edust - Organizations" /> */}
      {isLoading &&
        Array(3)
          .fill(1)
          .map((_, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>
                  <Skeleton className="h-6 w-full" />
                </CardTitle>
                <CardFooter className="flex items-center justify-between p-0">
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-6 w-6" />
                </CardFooter>
              </CardHeader>
            </Card>
          ))}
      {data?.data?.items &&
        data?.data?.items?.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <CardTitle>
                <Link
                  href={`/organizations/profile/${item.orgUsername}`}
                  target="_blank"
                >
                  <Typography variant="large" className="capitalize">
                    {item.name}
                  </Typography>
                </Link>
              </CardTitle>
            </CardHeader>
            <CardFooter className="flex items-center justify-between">
              <Typography affects="muted">
                {format(new Date(item.createdAt), "MMM dd, yyyy")}
              </Typography>
              {item.site && (
                <Link
                  href={`/organizations/profile/${item.orgUsername}/site`}
                  target="_blank"
                >
                  <Button variant={"link"} size={"icon"}>
                    <svg
                      viewBox="0 0 64 64"
                      xmlns="http://www.w3.org/2000/svg"
                      strokeWidth="3"
                      stroke="currentColor"
                      fill="none"
                    >
                      <path d="M39.93,55.72A24.86,24.86,0,1,1,56.86,32.15a37.24,37.24,0,0,1-.73,6" />
                      <path d="M37.86,51.1A47,47,0,0,1,32,56.7" />
                      <path d="M32,7A34.14,34.14,0,0,1,43.57,30a34.07,34.07,0,0,1,.09,4.85" />
                      <path d="M32,7A34.09,34.09,0,0,0,20.31,32.46c0,16.2,7.28,21,11.66,24.24" />
                      <line x1="10.37" y1="19.9" x2="53.75" y2="19.9" />
                      <line x1="32" y1="6.99" x2="32" y2="56.7" />
                      <line x1="11.05" y1="45.48" x2="37.04" y2="45.48" />
                      <line x1="7.14" y1="32.46" x2="56.86" y2="31.85" />
                      <path d="M53.57,57,58,52.56l-8-8,4.55-2.91a.38.38,0,0,0-.12-.7L39.14,37.37a.39.39,0,0,0-.46.46L42,53.41a.39.39,0,0,0,.71.13L45.57,49Z" />
                    </svg>
                  </Button>
                </Link>
              )}
            </CardFooter>
          </Card>
        ))}
    </div>
  )
}
