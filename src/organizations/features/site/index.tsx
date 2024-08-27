import { useGetSiteQuery } from "@/app/api/v0/organizations";
import { Button } from "@/components/ui";
import { Link } from "react-router-dom";

export const Site = () => {
  const { data } = useGetSiteQuery();

  return (
    <div>
      {data?.status && (
        <Link to={"edit"} target="_blank">
          <Button>Edit Site</Button>
        </Link>
      )}
    </div>
  );
};
