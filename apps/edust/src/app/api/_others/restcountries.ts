import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export interface CountriesResponse {
  name: {
    common: string
    official: string
    nativeName: {
      [key: string]: {
        official: string
        common: string
      }
    }
  }
}

export interface FlagData {
  png: string
  svg: string
  alt: string
}

export interface CountryResponse {
  flags: FlagData
}

export interface FlagsResponse {
  png: string
  svg: string
  alt: string
}

export const restCountriesApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: `https://restcountries.com/v3.1` }),
  reducerPath: "_others_Api_RestCountries",
  tagTypes: ["_Others_RestCountries"],

  endpoints: (build) => ({
    getCountries: build.query<string[], void>({
      query: () => `/all?fields=name`,
      transformResponse: (response: CountriesResponse[]) => {
        return response.map((country) => country.name.common)
      },
    }),

    getFlagsByCountry: build.query<FlagsResponse, string>({
      query: (countryName: string) => `/name/${countryName}?fields=flags`,
      transformResponse: (response: CountryResponse[]): FlagsResponse => {
        if (!response[0] || !response[0].flags) {
          return { png: "", svg: "", alt: "" }
        }

        const { png, svg, alt } = response[0].flags

        return { png, svg, alt }
      },
    }),
  }),
})

export const { useGetCountriesQuery, useGetFlagsByCountryQuery } =
  restCountriesApi
