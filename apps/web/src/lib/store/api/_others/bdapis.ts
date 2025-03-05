import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export interface Division {
  division: string
  divisionbn: string
  coordinates: string
}

export interface Status {
  code: number
  message: string
  date: Date
}

export interface DivisionResponse {
  status: Status
  data: Division[]
}

export interface District {
  district: string
  districtbn: string
  coordinates: string
}

export interface DistrictResponse {
  status: Status
  data: District[]
}

export interface SubDistrict extends District {
  upazillas: string[]
}

export interface SubDistrictResponse {
  status: Status
  data: SubDistrict[]
}

export const bdapisApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: `https://bdapis.com/api/v1.2` }),

  reducerPath: "API_employeesApi",
  tagTypes: ["Employees"],

  endpoints: (build) => ({
    getBDDivisions: build.query<string[], void>({
      query: () => "/divisions",
      transformResponse: (division: DivisionResponse): string[] => {
        return division.data.map((div) => div.division)
      },
    }),
    getBDDistricts: build.query<string[], void>({
      query: () => "/districts",
      transformResponse: (district: DistrictResponse): string[] => {
        return district.data.map((dis) => dis.district)
      },
    }),
    getBDSubDistrictByDistrict: build.query<string[], string>({
      query: (division) => `/district/${division}`,
      transformResponse: (district: SubDistrictResponse): string[] => {
        if (!district?.data) return []

        return district?.data[0].upazillas
      },
    }),
  }),
})

export const {
  useGetBDDivisionsQuery,
  useGetBDDistrictsQuery,
  useGetBDSubDistrictByDistrictQuery,
} = bdapisApi
