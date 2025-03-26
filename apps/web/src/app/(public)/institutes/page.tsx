"use client"

import { useGetInstitutesQuery } from "@/lib/store/api/v0/public"
import { useAppSelector } from "@/lib/store/hooks"

import FilterInstitute from "./filter-institute"
import { InstitutesCard } from "./institutes-card"
import { InstitutesCardSkeleton } from "./institutes-card-skeleton"
import InstituteNotFound from "./institutes-not-found"

export default function Institutes() {
  const stateInstituteFilter = useAppSelector((state) => state.institutes)

  const {
    data: { data } = {},
    isLoading,
    isFetching,
  } = useGetInstitutesQuery({
    search: { name: stateInstituteFilter.name },
    filter: { instituteCategoryId: stateInstituteFilter.instituteCategoryId },
  })

  return (
    <div>
      <title>Find Your Institute</title>
      <section className="container grid gap-4 py-4 sm:grid-cols-[250px_auto] md:gap-6 md:py-8">
        <aside>
          <FilterInstitute />
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
