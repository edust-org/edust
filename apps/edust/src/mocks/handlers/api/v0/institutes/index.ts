import { http, HttpResponse } from "msw"
import { apiUrlV0 } from "../../api-url"
import token from "@/mocks/token"
import storeDB from "./store.json"
import meDB from "./me.json"

const postInstitute = http.post(`${apiUrlV0}/institutes`, ({ request }) => {
  token.isAuthenticated(request)
  return HttpResponse.json(storeDB)
})

const getMeInstitute = http.get(`${apiUrlV0}/institutes/me`, ({ request }) => {
  token.isAuthenticated(request)
  return HttpResponse.json(meDB)
})

export const institutes = [postInstitute, getMeInstitute]
