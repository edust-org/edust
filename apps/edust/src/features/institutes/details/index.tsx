import { useGetInstituteByIdQuery } from "@/app/api/v0/public";
import { Navbar } from "@/components";
import { useParams } from "react-router-dom";

export const InstituteDetails = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetInstituteByIdQuery(id);
  console.log(data);

  return (
    <>
      <header className="sticky top-0 z-50 border-b bg-white/30 backdrop-blur-3xl">
        <Navbar.Guest />
      </header>
    </>
  );
};
