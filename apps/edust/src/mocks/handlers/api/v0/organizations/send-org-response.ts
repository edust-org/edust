import { HttpResponse } from "msw"
import token from "@/mocks/token"

export const sendOrgResponse = (request: Request, data: any) => {
  token.isAuthenticated(request)
  token.isOrganizer(request)
  return HttpResponse.json(data)
}
