import { Navbar } from "@/components";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { InstitutesCard } from "./institutes-card";
import InstituteNotFound from "./institutes-not-found";
import { useGetInstitutesQuery } from "@/app/api/v0/public";
import { Helmet } from "react-helmet-async";
import FilterInstitute from "./filter-institute";

export const Institutes = () => {
  const { data: { data } = {}, error, isLoading } = useGetInstitutesQuery({});

  return (
    <div>
      <Helmet>
        <meta
          name="description"
          content="Welcome to Edust, a design platform for creating engaging and beautiful educational content."
        />
        <title>Institute | Welcome to here</title>
      </Helmet>
      <header className="sticky top-0 z-50 border-b bg-white/30 backdrop-blur-3xl">
        <Navbar.Guest />
      </header>
      <section className="container grid gap-4 py-4 sm:grid-cols-[250px_auto] md:gap-6 md:py-8">
        <aside>
          <FilterInstitute/>
        </aside>

        <main>
          {isLoading ? (
            <AiOutlineLoading3Quarters className="size-6 animate-spin" />
          ) : data?.items?.length ? (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {data?.items?.map((item: any) => (
                <InstitutesCard key={item?.id} item={item} />
              ))}
            </div>
          ) : (
            <InstituteNotFound />
          )}
        </main>
      </section>
    </div>
  );
};
