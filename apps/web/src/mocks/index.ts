import { defaultValues } from "@/configs"
import { createServer } from "miragejs"

import getInstitutesCategoriesDB from "./get-institutes-categories-db.json"

export function makeServer({ environment = "development" } = {}) {
  return createServer({
    environment,

    routes() {
      this.namespace = "api/v0"
      this.urlPrefix = defaultValues.frontendURL

      this.get("/public/institutes/categories", () => {
        return getInstitutesCategoriesDB
      })
    },
  })
}
