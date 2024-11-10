<<<<<<< HEAD
import { useGetInstituteByIdQuery } from "@/app/api/v0/public";
import { Navbar } from "@/components";
import { useParams } from "react-router-dom";
=======
import { Typography } from "@/components/ui";
import { Helmet } from "react-helmet-async";
>>>>>>> 5e3872c (dynamicly title changing functionalities added)

export const InstituteDetails = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetInstituteByIdQuery(id);
  console.log(data);

  return (
    <>
<<<<<<< HEAD
      <header className="sticky top-0 z-50 border-b bg-white/30 backdrop-blur-3xl">
        <Navbar.Guest />
=======
     <Helmet>
        {/* <meta name="description" content="Welcome to Edust, a design platform for creating engaging and beautiful educational content." /> */}
        <title>Details | Welcome to here</title>
        
      </Helmet>
      <header
        style={{
          backgroundImage: `linear-gradient(
      rgba(4, 9, 30, 0.7),
      rgba(4, 9, 30, 0.7)
    ), url("https://ritchennai.org/img/rit-about.jpg")`,
        }}
        className="flex h-96 items-center justify-center bg-cover bg-center py-8 text-white"
      >
        <div className="container mx-auto px-6 text-center">
          <Typography variant="h1">Shamsul Huda Khan College</Typography>
          <Typography variant="h2" className="mt-3">
            (শামছুল হুদা খান কলেজ)
          </Typography>
        </div>
>>>>>>> 5e3872c (dynamicly title changing functionalities added)
      </header>
    </>
  );
};
