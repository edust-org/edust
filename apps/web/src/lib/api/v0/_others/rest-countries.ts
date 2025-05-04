import axios from "axios"

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

const BASE_URL = "https://restcountries.com/v3.1"

export const getCountries = async (): Promise<string[]> => {
  const response = await axios.get<CountriesResponse[]>(
    `${BASE_URL}/all?fields=name`,
  )
  return response.data.map((country) => country.name.common)
}

export const getFlagsByCountry = async (
  countryName: string,
): Promise<FlagsResponse> => {
  const response = await axios.get<CountryResponse[]>(
    `${BASE_URL}/name/${countryName}?fields=flags`,
  )

  const flags = response.data?.[0]?.flags

  return {
    png: flags?.png || "",
    svg: flags?.svg || "",
    alt: flags?.alt || "",
  }
}
