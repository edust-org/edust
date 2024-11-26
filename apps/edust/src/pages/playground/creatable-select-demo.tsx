import { CreatableSelect } from "@/components/ui/manual"

export const CreatableSelectDemo = () => {
  const industries = {
    data: {
      data: [
        { label: "Technology", value: "Technology" },
        { label: "Healthcare", value: "Healthcare" },
        { label: "Education", value: "Education" },
        { label: "Finance", value: "Finance" },
        { label: "Retail", value: "Retail" },
      ],
    },
  }
  return (
    <div>
      <CreatableSelect
        name="industry"
        isLoading={false}
        mutate={() => {
          console.log("object")
        }}
        options={
          industries?.data?.data?.map((industry) => {
            return {
              label: industry.label,
              value: industry.value,
            }
          }) || []
        }
      />
    </div>
  )
}
