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

export const InstitutesCard = () => {
  return (
    <>
      <Card className="overflow-hidden rounded-lg border shadow">
        <div className="">
          <img
            src="https://images.unsplash.com/photo-1537202108838-e7072bad1927?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGluc3RpdHV0ZXxlbnwwfHwwfHx8MA%3D%3D"
            alt="Institute Image "
            className="max-h-60 w-full object-cover"
          />
        </div>

        <CardContent className="p-4">
          {/* Badge */}
          <Link to="#">
            <Badge className="mb-2 bg-slate-800 text-white">University</Badge>
          </Link>
          {/* Title */}
          <CardTitle className="my-3">
            <Link to="#">Tech University</Link>
          </CardTitle>

          {/* Icons */}
          <div className="mt-5 flex justify-between text-xl text-slate-700 sm:text-2xl">
            <Link to="#">
              <Phone />
            </Link>
            <Link to="#">
              <Mail />
            </Link>
            <Link to="#">
              <MapPin />
            </Link>
          </div>
        </CardContent>

        <CardFooter className="flex items-center gap-2 p-4">
          <Link to="#">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </Link>

          <div>
            <Link to="#">
              <Typography className="text-sm font-medium">John Doe</Typography>
            </Link>
            <Link to="#">
              <Typography className="text-xs text-muted-foreground">
                Oct 29 2024
              </Typography>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </>
  );
};
