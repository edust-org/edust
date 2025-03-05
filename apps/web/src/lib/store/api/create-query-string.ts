export type QueryObject = {
  [key: string]: string | number | boolean | QueryObject | undefined
}

const createQueryString = (query: QueryObject): string => {
  const params = new URLSearchParams()

  // Helper function to handle dynamic keys and nested objects
  const appendNestedParams = (obj: QueryObject, prefix: string = ""): void => {
    for (const [key, value] of Object.entries(obj)) {
      if (value === undefined) continue // Skip undefined values
      const newKey = prefix ? `${prefix}[${key}]` : key
      if (typeof value === "object" && value !== null) {
        appendNestedParams(value as QueryObject, newKey) // Recursively handle nested objects
      } else {
        params.append(newKey, String(value)) // Convert value to string to handle numbers/booleans
      }
    }
  }

  // Process the query object
  appendNestedParams(query)

  return `?${params.toString()}`
}
export default createQueryString
/*
  *example object

  const query: QueryObject = {
    search: { name: "Dhaka" },
    filter: {
      instituteCategoryId: "1212",
      codeType: "EIIN",
    },
    sortBy: "country",
  };
*/
