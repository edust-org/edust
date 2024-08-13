import { useParams } from "react-router-dom";
import { GrapesJs } from "./grapesjs";
import { useGetPageByIdQuery } from "@/app/api/v0/organizations";
import Loading from "@/components/loading";

export const SitesPageCustomize = () => {
  const { pageId } = useParams();
  const { data, isLoading } = useGetPageByIdQuery(pageId);

  if (isLoading) {
    return <Loading.Spinner />;
  }

  return (
    <>
      {data?.data?.content && (
        <GrapesJs pageId={pageId || null} content={data?.data?.content} />
      )}
    </>
  );
};
