import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Card,
  CardContent,
  CardFooter,
  CardTitle,
  Skeleton,
  Typography,
} from "@/components/ui"
import { useGetFlagsByCountryQuery } from "@/lib/store/api/_others/restcountries"
import { format } from "date-fns"
import { Mail, MapPin, Phone } from "lucide-react"
import Link from "next/link"

import { FC } from "react"

type InstitutesCardProps = {
  item: any
}

export const InstitutesCard: FC<InstitutesCardProps> = ({ item }) => {
  const {
    id,
    instituteCategory,
    name,
    photo,
    phoneNumber,
    contactEmail,
    latitude,
    longitude,
    author: { name: authorName, profilePic },
    createdAt,
    country,
  } = item

  const { data: flag, isLoading: isFlagLoading } =
    useGetFlagsByCountryQuery(country)

  const fallbackName = (name: string) => {
    const arrName = name.split(" ").filter(Boolean)

    const firstChar = arrName[0][0]
    const lastChar = arrName.length > 1 ? arrName[1][0] : ""
    return `${firstChar}${lastChar}`.toUpperCase()
  }

  return (
    <>
      <Card className="overflow-hidden rounded-lg border py-0 shadow">
        <Link href={`/institutes/${id}`}>
          <img
            src={
              photo ||
              "https://images.unsplash.com/photo-1537202108838-e7072bad1927?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGluc3RpdHV0ZXxlbnwwfHwwfHx8MA%3D%3D"
            }
            alt="Institute Image "
            className="max-h-60 w-full object-cover"
          />
        </Link>

        <CardContent className="p-4">
          {/* Badge */}
          <Link href="#">
            <Badge className="mb-2 bg-slate-800 capitalize text-white">
              {instituteCategory}
            </Badge>
          </Link>
          {/* Title */}
          <CardTitle className="my-3 hover:underline">
            <Link href={`/institutes/${id}`}>{name}</Link>
          </CardTitle>

          {/* Icons */}
          <div className="mt-5 flex justify-between text-xl text-slate-700 sm:text-2xl">
            <a href={`tel:${phoneNumber}`}>
              <Phone />
            </a>

            <a href={`mailto:${contactEmail}`}>
              <Mail />
            </a>

            <a
              href={`https://www.google.com/maps?q=${latitude},${longitude}`}
              target="_blank"
            >
              <MapPin />
            </a>
          </div>
        </CardContent>

        <CardFooter className="flex items-center justify-between p-4">
          <div className="flex flex-1 items-center gap-2">
            <Link href="#">
              <Avatar>
                <AvatarImage
                  src={profilePic || "https://github.com/shadcn.png"}
                />
                <AvatarFallback>{fallbackName(authorName)}</AvatarFallback>
              </Avatar>
            </Link>
            <div>
              <Link href="#">
                <Typography className="text-sm font-medium">
                  {authorName}
                </Typography>
              </Link>
              <Link href="#">
                <Typography className="text-muted-foreground text-xs">
                  {format(new Date(createdAt), "MMM dd yyyy")}
                </Typography>
              </Link>
            </div>
          </div>

          {isFlagLoading ? (
            <Skeleton className="h-6 w-9 rounded" />
          ) : (
            <img className="w-8 rounded-sm" src={flag?.png} alt={flag?.alt} />
          )}
        </CardFooter>
      </Card>
    </>
  )
}
