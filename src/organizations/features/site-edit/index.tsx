import { useGetSiteQuery } from "@/app/api/v0/organizations";
import { GrapesjsShadcnUI } from "@/lib/grapesjs-shadcn-ui";

export const SiteEdit = () => {
  const { data } = useGetSiteQuery();

  return <div>{data?.status && <GrapesjsShadcnUI />}</div>;
};
