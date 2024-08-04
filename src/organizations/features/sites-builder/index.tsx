import { Container } from "@/components";
import { Button, Input, Typography } from "@/components/ui";
import { useState } from "react";
import { Link } from "react-router-dom";

export const SitesBuilder = () => {
  const [data, setData] = useState([]);
  return (
    <div>
      <Container>
        <form className="py-5">
          <Input type="text" placeholder="page-name" className="mb-4" />
          <Button type="submit">Create a Page</Button>
        </form>

        <div className="flex items-center gap-4 mt-8">
          {data &&
            data.map((page) => (
              <div
                key={page?.id}
                className="p-4 shadow-sm bg-slate-50 hover:bg-slate-100 transition"
              >
                <Typography variant="h2">
                  ID: {page.id} | {page.page_name}
                </Typography>
                <Link to={page.id} target="_blank">
                  <Button variant={"outline"}>{page.page_name}</Button>
                </Link>
              </div>
            ))}
        </div>
      </Container>
    </div>
  );
};
