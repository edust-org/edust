import { useGetOrgListsQuery } from "@/app/api/v0/organizations";
import { Button, Skeleton, Typography } from "@/components/ui";
import { Eye } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export const OrgLists = () => {
  const { data, isLoading } = useGetOrgListsQuery();

  return (
    <div className="mx-auto grid max-w-lg grid-cols-1 items-center justify-center gap-6">
      <Helmet>
        <title>Home - Edust</title>
        <meta name="description" content="Edust - Organizations" />
        <meta property="og:title" content="Home - Edust" />
        <meta property="og:description" content="Edust - Organizations" />
      </Helmet>
      {isLoading &&
        Array(3)
          .fill(1)
          .map((_, index) => (
            <div
              key={index}
              className="space-y-4 border bg-background p-6 shadow"
            >
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
      {data?.data?.items &&
        data?.data?.items?.map((item) => (
          <div
            key={item.id}
            className="space-y-4 border bg-background p-6 shadow"
          >
            <Typography variant="h3" className="capitalize">
              <Link to={"#"} className="underline-offset-8 hover:underline">
                {item.name}
              </Link>
            </Typography>
            <div className="flex items-center justify-between">
              <Typography className="text-sm text-muted-foreground">
                Aug 10 2024
              </Typography>
              <Link to={`/${item.org_username}/site`} target="_blank">
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
