import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Card,
  CardContent,
  CardFooter,
  CardTitle,
  Typography,
} from "@/components/ui";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { format } from "date-fns";
import axios from "axios";

type InstitutesCardProps = {
  item: any;
};

export const InstitutesCard: FC<InstitutesCardProps> = ({ item }) => {
  const [flags, setFlags] = useState({ png: "", alt: "" });

  const {
    id,
    institute_category,
    name,
    photo,
    phone_number,
    contact_email,
    latitude,
    longitude,
    author: { name: authorName, profile_pic },
    createdAt,
    country,
  } = item;

  console.log(item);

  const fallbackName = (name: string) => {
    const arrName = name.split(" ").filter(Boolean);

    const firstChar = arrName[0][0];
    const lastChar = arrName.length > 1 ? arrName[1][0] : "";
    return `${firstChar}${lastChar}`.toUpperCase();
  };

  useEffect(() => {
    const getCountry = async () => {
      const data = await axios.get(
        `https://restcountries.com/v3.1/name/${country}?fields=flags`,
      );
      // console.log(data.data[0]?.flags);
      setFlags(data.data[0]?.flags);
    };

    getCountry();
  }, []);

  return (
    <>
      <Card className="overflow-hidden rounded-lg border shadow">
        <Link to={`/institutes/${id}`}>
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
          <Link to="#">
            <Badge className="mb-2 bg-slate-800 capitalize text-white">
              {institute_category}
            </Badge>
          </Link>
          {/* Title */}
          <CardTitle className="my-3 hover:underline">
            <Link to={`/institutes/${id}`}>{name}</Link>
          </CardTitle>

          {/* Icons */}
          <div className="mt-5 flex justify-between text-xl text-slate-700 sm:text-2xl">
            <a href={`tel:${phone_number}`}>
              <Phone />
            </a>

            <a href={`mailto:${contact_email}`}>
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
            <Link to="#">
              <Avatar>
                <AvatarImage
                  src={profile_pic || "https://github.com/shadcn.png"}
                />
                <AvatarFallback>{fallbackName(authorName)}</AvatarFallback>
              </Avatar>
            </Link>
            <div>
              <Link to="#">
                <Typography className="text-sm font-medium">
                  {authorName}
                </Typography>
              </Link>
              <Link to="#">
                <Typography className="text-xs text-muted-foreground">
                  {format(new Date(createdAt), "MMM dd yyyy")}
                </Typography>
              </Link>
            </div>
          </div>

          <img className="w-8 rounded-sm" src={flags?.png} alt={flags?.alt} />
        </CardFooter>
      </Card>
    </>
  );
};
