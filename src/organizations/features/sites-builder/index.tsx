import { Container } from "@/components";
import { Button, Input, Typography } from "@/components/ui";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { siteBuilder } from "@/api/organizations";

export const SitesBuilder = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchPagesData();
  }, []);

  const fetchPagesData = async () => {
    try {
      const pages = await siteBuilder.getPages();
      setData(pages || []);
    } catch (error) {
      console.error("Error fetching pages:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await siteBuilder.postPage({
        organizationId: "1",
        page_name: event.target[0].value,
      });
    } catch (error) {
      throw new Error("Error submitting page data:", error);
    } finally {
      fetchPagesData();
    }

    // const payload = {
    //   organizationId: "1",
    //   page_name: event.target[0].value,
    // };

    // axios
    //   .post("http://localhost:3000/organization_page", payload)
    //   .then((response) => {
    //     console.log("Page created successfully:", response.data);
    //     fetchPagesData(); // Fetch the updated list of pages
    //   })
    //   .catch((error) => {
    //     console.error("Error creating page:", error);
    //   });
  };

  return (
    <div>
      <Container>
        <form className="py-5" onSubmit={(event) => handleSubmit(event)}>
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
