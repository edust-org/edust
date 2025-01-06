import { Navbar } from "@/components"
import { InstitutesCard } from "./institutes-card"
import InstituteNotFound from "./institutes-not-found"
import { useGetInstitutesQuery } from "@/app/api/v0/public"
import { Helmet } from "react-helmet-async"
import FilterInstitute from "./filter-institute"
import { InstitutesCardSkeleton } from "./institutes-card-skeleton"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui"

export const Institutes = () => {
  const [query, setQuery] = useState({})
  const {
    data: { data } = {},
    isLoading,
    isFetching,
  } = useGetInstitutesQuery(query)

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
          <FilterInstitute setQuery={setQuery} query={query} />
        </aside>
        <main>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {isLoading || isFetching ? (
              new Array(9)
                .fill("Card Skeleton")
                .map((_, index) => <InstitutesCardSkeleton key={index} />)
            ) : data?.items?.length ? (
              data?.items?.map((item: any) => (
                <InstitutesCard key={item?.id} item={item} />
              ))
            ) : (
              <div className="flex items-center justify-center">
                <InstituteNotFound />
              </div>
            )}
          </div>
        </main>
      </section>
    </div>
  )
}
