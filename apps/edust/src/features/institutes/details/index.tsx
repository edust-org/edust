import { useGetInstituteByIdQuery } from "@/app/api/v0/public";
import { Navbar } from "@/components";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@/components/ui";
import { Badge } from "@/components/ui/badge";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import FilterInstitute from "../filter-institute";

export const InstituteDetails = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetInstituteByIdQuery(id);
  console.log(data);

  return (
    <>
      <Helmet>
        <title>Institute Details - Edust</title>
        <meta name="description" content="Institute Details Page" />
        <meta property="og:title" content="Institute Details - Edust" />
        <meta property="og:description" content="Institute Details Page" />
      </Helmet>
      <header className="sticky top-0 z-50 border-b bg-white/30 backdrop-blur-3xl">
        <Navbar.Guest />
      </header>
      {/*  */}
      <section className="container grid gap-4 py-4 sm:grid-cols-[250px_auto] md:gap-6 md:py-8">
        <aside>
          <FilterInstitute />
        </aside>
        <div className="mx-auto max-w-screen-2xl">
          <Card className="border-none p-0">
            <CardHeader className="p-0">
              <img
                src="https://i.ibb.co.com/zG6sBXr/image-36.png"
                alt="building"
                className="w-full rounded-lg object-cover"
              />
              <CardTitle className="flex items-start gap-2 pb-4 pt-7 font-bold sm:text-3xl">
                <span>Gleichner, Tremblay and Tillman</span>
                <Badge>Badge</Badge>
              </CardTitle>
              <Typography className="border-y py-2">
                Published by
                <span className="font-semibold text-primary"> Edust Org </span>
                on February 5, 2022, at 4:15 PM (PDT)
              </Typography>
            </CardHeader>

            <CardContent className="p-0 pt-6">
              <div className="rounded-md border">
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="flex gap-4 sm:gap-24">
                        <span className="w-36 font-semibold">Code Type</span>
                        <span>EIIN</span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="flex gap-4 sm:gap-24">
                        <span className="w-36 font-semibold">Code</span>
                        <span>333333</span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="flex gap-4 sm:gap-24">
                        <span className="w-36 font-semibold">Email</span>
                        <span>institute@exapmle.com</span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="flex gap-4 sm:gap-24">
                        <span className="w-36 font-semibold">Phone</span>
                        <span>13245356793</span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="flex gap-4 sm:gap-24">
                        <span className="w-36 font-semibold">Website</span>
                        <span>www.institute.com</span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="flex gap-4 sm:gap-24">
                        <span className="w-36 font-semibold">Founded Date</span>
                        <span>2024-12-06</span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="flex gap-4 sm:gap-24">
                        <span className="w-36 font-semibold">Principal</span>
                        <span>Jhon Doe</span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="flex gap-4 sm:gap-24">
                        <span className="w-36 font-semibold">Language</span>
                        <span>Bengali</span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="flex gap-4 sm:gap-24">
                        <span className="w-36 font-semibold">Country</span>
                        <span>Bangladesh</span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="flex gap-4 sm:gap-24">
                        <span className="w-36 font-semibold">
                          State/Division
                        </span>
                        <span>Khulna</span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="flex gap-4 sm:gap-24">
                        <span className="w-36 font-semibold">
                          Country/District
                        </span>
                        <span>Chuadanga</span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="flex gap-4 sm:gap-24">
                        <span className="w-36 font-semibold">City/Town</span>
                        <span>Khulna</span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="flex gap-4 sm:gap-24">
                        <span className="w-36 font-semibold">
                          Street/House Number
                        </span>
                        <span>High Road</span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="flex gap-4 sm:gap-24">
                        <span className="w-36 font-semibold">Postal Code</span>
                        <span>3424</span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="flex gap-4 sm:gap-24">
                        <span className="w-36 font-semibold">Map</span>
                        <a
                          href="https://www.google.com/maps?q=23.761116975637687,88.94401531246783"
                          target="_blank"
                        >
                          See the area
                        </a>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
          <div className=" mt-7 border rounded-md p-3">
            <Typography className="p-0" affects="removePaddingMargin" variant="h2">Overview it will render html</Typography>
          </div>
        </div>
      </section>
      {/*  */}
    </>
  );
};
