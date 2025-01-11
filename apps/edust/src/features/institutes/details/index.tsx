import { useGetInstituteByIdQuery } from "@/app/api/v0/public"
import { Navbar } from "@/components"
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@/components/ui"
import { Badge } from "@/components/ui/badge"
import { Helmet } from "react-helmet-async"
import { useParams } from "react-router"
import { Link } from "react-router" // Add this line to import Link
import FilterInstitute from "../filter-institute"
import { format } from "date-fns"

import "katex/dist/katex.min.css"

import "reactjs-tiptap-editor/style.css"
import { Terminal } from "lucide-react"

export const InstituteDetails = () => {
  const { id } = useParams()

  const { data, isLoading } = useGetInstituteByIdQuery(id)

  const formatFoundedDate = (date: string) => {
    if (date) {
      const formed = format(new Date(date), "MMM dd, yyyy")
      return formed
    }
  }

  const formatPublishedDate = (date: string) => {
    if (date) {
      return format(date, "MMMM d, yyyy, 'at' h:mm a")
    }
  }

  return (
    <>
      <Helmet>
        <title>Institute Details - Edust</title>
        <meta name="description" content="Institute Details Page" />
        <meta property="og:title" content="Institute Details - Edust" />
        <meta property="og:description" content="Institute Details Page" />
      </Helmet>
      <header className="sticky top-0 z-50 border-b bg-white/30 backdrop-blur-3xl">
        <Navbar />
      </header>
      {/*  */}
      <section className="container grid gap-4 py-4 sm:grid-cols-[250px_auto] md:gap-6 md:py-8">
        <aside>
          <Skeleton className="mb-2 h-32" />
          <Skeleton className="mb-2 h-16" />
          <Typography className="text-center">Filter Institute</Typography>
          {/* <FilterInstitute /> */}
        </aside>
        <div className="mx-auto max-w-screen-2xl">
          <Card className="border-none p-0">
            <CardHeader className="p-0">
              <img
                src={data?.data?.photo}
                alt={data?.data.name}
                className="w-full rounded-lg object-cover"
              />
              <CardTitle className="flex items-start gap-2 pb-4 pt-7 font-bold sm:text-3xl">
                <span>{data?.data.name}</span>
                {/* Badge setted into Link  */}
                <Link to="#">
                  <Badge>{data?.data?.instituteCategory}</Badge>
                </Link>
              </CardTitle>
              <Typography className="border-y py-2">
                Published by
                {/* span to <Link></Link> */}
                <Link
                  to="#"
                  className="font-semibold text-primary hover:underline"
                >
                  {" "}
                  {data?.data?.author?.name}{" "}
                </Link>
                <span>on </span>
                <Link to="#" className="hover:underline">
                  {formatPublishedDate(data?.data?.createdAt)}
                </Link>
              </Typography>
            </CardHeader>

            <CardContent className="p-0 pt-6">
              <div className="rounded-md border">
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="flex gap-4 sm:gap-24">
                        <span className="w-36 font-semibold">Code Type</span>
                        <span>{data?.data?.codeType.toUpperCase()}</span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="flex gap-4 sm:gap-24">
                        <span className="w-36 font-semibold">Code</span>
                        <span>{data?.data?.code}</span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="flex gap-4 sm:gap-24">
                        <span className="w-36 font-semibold">Email</span>
                        <a
                          href={`mailto:${data?.data?.contactEmail}`}
                          className="hover:underline"
                        >
                          {data?.data?.contactEmail}
                        </a>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="flex gap-4 sm:gap-24">
                        <span className="w-36 font-semibold">Phone</span>
                        {/* changed span to a and add tel to attributes */}
                        <a href={`tel:${data?.data?.phoneNumber}`}>
                          {data?.data?.phoneNumber}
                        </a>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="flex gap-4 sm:gap-24">
                        <span className="w-36 font-semibold">Website</span>
                        <a
                          href={data?.data?.website}
                          target="_blank"
                          className="hover:underline"
                        >
                          {data?.data?.website}
                        </a>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="flex gap-4 sm:gap-24">
                        <span className="w-36 font-semibold">Founded Date</span>
                        <span>
                          {formatFoundedDate(data?.data?.foundedDate)}
                        </span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="flex gap-4 sm:gap-24">
                        <span className="w-36 font-semibold">Principal</span>
                        <span>{data?.data?.principalName}</span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="flex gap-4 sm:gap-24">
                        <span className="w-36 font-semibold">Language</span>
                        <span>{data?.data?.language}</span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="flex gap-4 sm:gap-24">
                        <span className="w-36 font-semibold">Country</span>
                        <span>{data?.data?.country}</span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="flex gap-4 sm:gap-24">
                        <span className="w-36 font-semibold">
                          State/Division
                        </span>
                        <span>{data?.data?.stateOrDivision}</span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="flex gap-4 sm:gap-24">
                        <span className="w-36 font-semibold">
                          Country/District
                        </span>
                        <span>{data?.data?.countyOrDistrict}</span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="flex gap-4 sm:gap-24">
                        <span className="w-36 font-semibold">City/Town</span>
                        <span>{data?.data?.cityOrTown}</span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="flex gap-4 sm:gap-24">
                        <span className="w-36 font-semibold">
                          Street/House Number
                        </span>
                        <span>{data?.data?.streetOrHouseNumber}</span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="flex gap-4 sm:gap-24">
                        <span className="w-36 font-semibold">Postal Code</span>
                        <span>{data?.data?.postalCode}</span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="flex gap-4 sm:gap-24">
                        <span className="w-36 font-semibold">Map</span>
                        <a
                          href={`https://www.google.com/maps?q=${data?.data?.latitude},${data?.data?.longitude}`}
                          target="_blank"
                          className="hover:underline"
                        >
                          View Loaction
                        </a>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <>
            {data?.data?.overview && (
              <div
                className="ProseMirror mt-7 rounded-md border p-3"
                aria-label="Rich-Text Editor"
              >
                <div
                  dangerouslySetInnerHTML={{ __html: data?.data?.overview }}
                ></div>
              </div>
            )}
          </>

          <Alert className="mt-6 lg:mt-8">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Disclaimer!</AlertTitle>
            <AlertDescription>
              The content displayed on this page has been collected from
              publicly available sources. While we strive to ensure accuracy,
              there may be errors or outdated information.
              <br />
              If you notice any incorrect or misleading details, please contact
              our support team. We will promptly review and correct any
              inaccuracies.
            </AlertDescription>
          </Alert>
        </div>
      </section>
      {/*  */}
    </>
  )
}
