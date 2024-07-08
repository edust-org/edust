import { useParams } from "react-router-dom";
import { GrapesJs } from "../grapesjs";

export const CustomizeSite = () => {
  const { pageId } = useParams();
  return (
    <>
      <GrapesJs pageId={pageId} />
    </>
  );
};
