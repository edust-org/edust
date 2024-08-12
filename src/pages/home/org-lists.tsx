import { useGetOrgListsQuery } from "@/app/api/v0/organizations";
import { Button, Skeleton, Typography } from "@/components/ui";
import { Eye } from "lucide-react";
import { Link } from "react-router-dom";

export const OrgLists = () => {
  const { data, isLoading } = useGetOrgListsQuery();

  return (
    <div className="grid grid-cols-1 gap-6 items-center justify-center max-w-lg mx-auto">
      {isLoading &&
        Array(3)
          .fill(1)
          .map((_, index) => (
            <div key={index} className="bg-white shadow p-6 space-y-4">
              <Skeleton className="w-full h-6" />
              <Skeleton className="w-full h-10" />
            </div>
          ))}
      {data?.data?.items &&
        data?.data?.items?.map((item) => (
          <div key={item.id} className="bg-white shadow p-6 space-y-4">
            <Typography variant="h3" className="capitalize">
              <Link to={"#"} className="hover:underline underline-offset-8">
                {item.name}
              </Link>
            </Typography>
            <div className="flex items-center justify-between">
              <Typography className="text-muted-foreground text-sm">
                Aug 10 2024
              </Typography>
              <Link to={`/${item.org_username}/sites`} target="_blank">
                <Button variant={"secondary"} size={"icon"}>
                  <Eye />
                </Button>
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
};
