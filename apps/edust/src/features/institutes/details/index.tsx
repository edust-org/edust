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
import { Link } from 'react-router-dom'; // Add this line to import Link
import FilterInstitute from "../filter-institute";
import { format } from "date-fns";

export const InstituteDetails = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetInstituteByIdQuery(id);
  console.log(data);

  const formatFoundedDate = (date: string) => {
    if (date) {
      const formed = format(new Date(date), "MMM dd, yyyy")
      return formed
    }
  }

  const formatPublishedDate =(date:string)=>{
    if(date){
      return  format(date, "MMMM d, yyyy, 'at' h:mm a");
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
                <span>{data?.data.name}</span>
                {/* Badge setted into Link  */}
                <Link to="#"><Badge>{data?.data?.institute_category}</Badge></Link>
              </CardTitle>
              <Typography className="border-y py-2">
                Published by
                {/* span to <Link></Link> */}
                <Link to="#" className="font-semibold text-primary hover:underline"> {data?.data?.author?.name} </Link>
                <span>on </span>
                <Link to="#" className="hover:underline">{formatPublishedDate(data?.data?.createdAt)}</Link>
              </Typography>
            </CardHeader>

            <CardContent className="p-0 pt-6">
              <div className="rounded-md border">
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell className="flex gap-4 sm:gap-24">
                        <span className="w-36 font-semibold">Code Type</span>
                        <span>{data?.data?.code_type.toUpperCase()}</span>
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
                        <a href={`mailto:${data?.data?.contact_email}`}
                        className="hover:underline"
                        >{data?.data?.contact_email}</a>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="flex gap-4 sm:gap-24">
                        <span className="w-36 font-semibold">Phone</span>
                        {/* changed span to a and add tel to attributes */}
                        <a href={`tel:${data?.data?.phone_number}`}>{data?.data?.phone_number}</a>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="flex gap-4 sm:gap-24">
                        <span className="w-36 font-semibold">Website</span>
                        <a href={data?.data?.website} target="_blank"
                        className="hover:underline"
                        >{data?.data?.website}</a>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="flex gap-4 sm:gap-24">
                        <span className="w-36 font-semibold">Founded Date</span>
                        <span>{formatFoundedDate(data?.data?.founded_date)}</span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="flex gap-4 sm:gap-24">
                        <span className="w-36 font-semibold">Principal</span>
                        <span>{data?.data?.principal_name}</span>
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
                        <span>{data?.data?.state_or_division}</span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="flex gap-4 sm:gap-24">
                        <span className="w-36 font-semibold">
                          Country/District
                        </span>
                        <span>{data?.data?.county_or_district}</span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="flex gap-4 sm:gap-24">
                        <span className="w-36 font-semibold">City/Town</span>
                        <span>{data?.data?.city_or_town}</span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="flex gap-4 sm:gap-24">
                        <span className="w-36 font-semibold">
                          Street/House Number
                        </span>
                        <span>{data?.data?.street_or_house_number}</span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="flex gap-4 sm:gap-24">
                        <span className="w-36 font-semibold">Postal Code</span>
                        <span>{data?.data?.postal_code}</span>
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
          <div className=" mt-7 border rounded-md p-3">
            <Typography className="p-0" affects="removePaddingMargin" variant="h2">Overview it will render html</Typography>
          </div>
        </div>
      </section>
      {/*  */}
    </>
  );
};
