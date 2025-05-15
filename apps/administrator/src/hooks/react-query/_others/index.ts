import api from "@/lib/api"
import { FlagsResponse } from "@/lib/api/v0/_others"
import { useQuery } from "@tanstack/react-query"

export const useCountries = () => {
  return useQuery({
    queryKey: ["countries"],
    queryFn: api.v0.getCountries,
  })
}

export const useGetFlagsByCountry = (countryName: string) => {
  return useQuery<FlagsResponse>({
    queryKey: ["flags", countryName],
    queryFn: () => api.v0.getFlagsByCountry(countryName),
    enabled: !!countryName,
  })
}

export const useGetBDDivisions = () => {
  return useQuery({
    queryKey: ["bd-divisions"],
    queryFn: api.v0.getBDDivisions,
  })
}

export const useGetBDDistricts = () => {
  return useQuery({
    queryKey: ["bd-districts"],
    queryFn: api.v0.getBDDistricts,
  })
}

export const useGetBDSubDistrictByDistrict = (districtName: string) => {
  return useQuery({
    queryKey: ["bd-subdistricts", districtName],
    queryFn: () => api.v0.getBDSubDistrictByDistrict(districtName),
    enabled: !!districtName,
  })
}
