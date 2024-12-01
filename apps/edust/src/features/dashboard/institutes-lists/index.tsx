import { useGetMeInstitutesListsQuery } from "@/app/api/v0/institutes"
import { DataTable } from "./components/data-table"
import { columns } from "./components/columns"

export const InstitutesLists = () => {
  const { data } = useGetMeInstitutesListsQuery()
  const institute = data?.data?.items || []
  return (
    <>
      <DataTable columns={columns} data={institute} />
    </>
  )
}
