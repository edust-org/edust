import { useGetSiteQuery } from "@/app/api/v0/organizations";
import Loading from "@/components/loading";
import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
  Typography,
} from "@/components/ui";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Site = () => {
  const { data, isLoading } = useGetSiteQuery();
  const [pages, setPages] = useState<[]>([]);

  useEffect(() => {
    if (data?.data?.pages) {
      setPages(JSON.parse(data?.data?.pages));
    }
  }, [data?.data.pages]);

  if (isLoading) {
    return <Loading.Spinner />;
  }

  return (
    <>
      <section>
        <Card>
          <CardHeader>
            <CardTitle>Customize your sites</CardTitle>
          </CardHeader>
          <CardFooter>
            <Link to={"edit"} target="_blank">
              <Button>Edit</Button>
            </Link>
          </CardFooter>
        </Card>
      </section>

      <section>
        <Typography variant="h2">Pages List</Typography>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {pages &&
            pages.map((page) => {
              return (
                <Card key={page.id}>
                  <CardHeader>
                    <CardTitle>{page.name}</CardTitle>
                  </CardHeader>
                </Card>
              );
            })}
        </div>
      </section>
    </>
  );
};
