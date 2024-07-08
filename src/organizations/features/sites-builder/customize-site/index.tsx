import { useParams } from "react-router-dom";
import { GrapesJs } from "../grapesjs";
import { Typography } from "@/components/ui";

export const CustomizeSite = () => {
  const { siteId } = useParams();
  return (
    <>
      <Typography variant="h1">siteId: {siteId}</Typography>
      <Typography>Temporary data </Typography>
      <GrapesJs />
    </>
  );
};
