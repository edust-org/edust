import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useGetOrgSitesPagesQuery } from "@/app/api/v0/public";
import { toast } from "@/hooks/shadcn-ui";
import { Button, Typography } from "@/components/ui";
import { Link } from "react-router-dom";

export const Site = () => {
  const params = useParams();
  const location = useLocation();

  const { data, isLoading, error } = useGetOrgSitesPagesQuery(
    params.orgIdOrUsername,
  );

  const [content, setContent] = useState(null);

  useEffect(() => {
    if (data?.data?.items[0]) {
      setContent(data?.data?.items[0]);
    }
    if (error?.data?.status) {
      toast({
        variant: "destructive",
        title: error?.data?.message,
      });
    }
  }, [data?.data?.items, error?.data?.message, error?.data?.status]);

  const [isTailwindLoaded, setTailwindLoaded] = useState(false);

  useEffect(() => {
    const handleLoad = () => setTailwindLoaded(true);

    const tailwindScript = document.createElement("script");
    tailwindScript.src = "https://cdn.tailwindcss.com?v=3.4.5";
    tailwindScript.async = true;
    tailwindScript.onload = handleLoad;
    document.head.appendChild(tailwindScript);

    // Cleanup function to remove the script
    return () => {
      document.head.removeChild(tailwindScript);
    };
  }, []);

  useEffect(() => {
    if (isTailwindLoaded && content?.css) {
      // By default tailwindcss available but when we use components we need cdn
      const style = document.createElement("style");
      style.type = "text/css";
      style.innerHTML = content.css;
      style.setAttribute("data-dynamic", "true");
      document.head.appendChild(style);
    }
  }, [isTailwindLoaded, content?.css]);

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {content && (
        <div dangerouslySetInnerHTML={{ __html: content?.html }}></div>
      )}
      {!content && !isLoading && (
        <div className="flex h-screen flex-col items-center justify-center gap-4">
          <Typography variant="h1" className="text-red-500">
            Site is not available.
          </Typography>
          <Link to={location.state?.from?.pathname || "/"}>
            <Button>go back</Button>
          </Link>
        </div>
      )}
    </>
  );
};
