"use client"

import { Loading, Navbar } from "@/components"
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@/components/ui"
import { Badge } from "@/components/ui/badge"
import { useGetInstituteByIdQuery } from "@/lib/store/api/v0/public"
import { format } from "date-fns"
import { Terminal } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

// Add this line to import Link
import FilterInstitute from "../filter-institute"

export default function InstituteDetails() {
  const { instituteId } = useParams()
  const { data, isLoading } = useGetInstituteByIdQuery(instituteId)

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
      {/*
        <title> {data?.data.name || "Institute Details"} - Edust</title>
        <meta name="description" content={"Institute Details Page"} />
        <meta property="og:title" content={"Institute Details Edust"} />
        <meta property="og:description" content={"Institute Details Page"} />
      */}
      <header className="sticky top-0 z-50 border-b bg-white/30 backdrop-blur-3xl">
        <Navbar />
      </header>
      {/*  */}
      <section className="container grid gap-4 py-4 sm:grid-cols-[250px_auto] md:gap-6 md:py-8">
        <aside>
          <FilterInstitute isDetailsPage />
        </aside>
        <div className="mx-auto max-w-screen-2xl">
          {isLoading && (
            <Typography>
              <Loading.FullScreen />
            </Typography>
          )}
          <Card>
            <CardHeader>
              <img
                src={data?.data?.photo}
                alt={data?.data.name}
                className="w-full rounded-lg object-cover"
              />
              <CardTitle className="flex items-start gap-2 pb-4 pt-7 font-bold sm:text-3xl">
                <span>{data?.data.name}</span>
                {/* Badge setted into Link  */}
                <Link href="#">
                  <Badge>{data?.data?.instituteCategory}</Badge>
                </Link>
              </CardTitle>
              <Typography className="border-y py-2">
                Published by
                {/* span to <Link></Link> */}
                <Link
                  href="#"
                  className="font-semibold text-primary hover:underline"
                >
                  {" "}
                  {data?.data?.author?.name}{" "}
                </Link>
                <span>on </span>
                <Link href="#" className="hover:underline">
                  {formatPublishedDate(data?.data?.createdAt)}
                </Link>
              </Typography>
            </CardHeader>

            <CardContent className="pt-6">
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
                        <span className="w-36 font-semibold">Division</span>
                        <span>{data?.data?.division}</span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="flex gap-4 sm:gap-24">
                        <span className="w-36 font-semibold">District</span>
                        <span>{data?.data?.district}</span>
                      </TableCell>
                    </TableRow>
                    {data?.data?.subDivision && (
                      <TableRow>
                        <TableCell className="flex gap-4 sm:gap-24">
                          <span className="w-36 font-semibold">
                            Sub Division
                          </span>
                          <span>{data?.data?.subDivision}</span>
                        </TableCell>
                      </TableRow>
                    )}
                    <TableRow>
                      <TableCell className="flex gap-4 sm:gap-24">
                        <span className="w-36 font-semibold">Sub District</span>
                        <span>{data?.data?.subDistrict}</span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="flex gap-4 sm:gap-24">
                        <span className="w-36 font-semibold">
                          Address line 1
                        </span>
                        <span>{data?.data?.addressLine1}</span>
                      </TableCell>
                    </TableRow>
                    {data?.data?.addressLine2 && (
                      <TableRow>
                        <TableCell className="flex gap-4 sm:gap-24">
                          <span className="w-36 font-semibold">
                            Address line 2
                          </span>
                          <span>{data?.data?.addressLine2}</span>
                        </TableCell>
                      </TableRow>
                    )}
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
                          View Location
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
