import type { Status } from "../common"

export interface Institute {
  id: string
  instituteCategoryId: string
  userId: string
  name: string
  slug: string
  code: string
  codeType: string
  overview?: string
  photo: string
  contactEmail: string
  phoneNumber: string
  website?: string
  foundedDate: Date
  principalName: string
  language: string
  country: string
  stateOrDivision: string
  countyOrDistrict: string
  cityOrTown: string
  streetOrHouseNumber: string
  postalCode: string
  latitude: number
  longitude: number
  status: Status
  createdAt: Date
  updatedAt: Date
}
