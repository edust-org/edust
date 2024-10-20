import { useLocation } from "react-router-dom";

export const useCheckActiveNav = () => {
  const { pathname } = useLocation();

  const checkActiveNav = (nav: string) => {
    const normalizedNav = nav.startsWith("/") ? nav : `/${nav}`;
    const pathArray = pathname.split("/").filter((item) => item !== "");

    if (normalizedNav === "/organizations") {
      return pathArray.length === 1 && pathArray[0] === "organizations";
    }
    return (
      pathname === normalizedNav || pathname.startsWith(normalizedNav + "/")
    );
  };

  return { checkActiveNav };
};
