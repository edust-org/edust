import axios from "axios"

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

const BASE_URL = "https://bdapi.vercel.app/api/v.1"

/**
 * Get all division names in Bangladesh.
 */
export const getBDDivisions = async (): Promise<string[]> => {
  try {
    const response = await axios.get<DivisionResponse>(`${BASE_URL}/division`)
    return response.data.data.map((div) => div.division)
  } catch (error) {
    console.error("Error fetching divisions:", error)
    return []
  }
}

/**
 * Get all district names in Bangladesh.
 */
export const getBDDistricts = async (): Promise<string[]> => {
  try {
    const response = await axios.get<DistrictResponse>(`${BASE_URL}/district`)
    return response.data.data.map((dis) => dis.district)
  } catch (error) {
    console.error("Error fetching districts:", error)
    return []
  }
}

/**
 * Get sub-districts (upazillas) by district name.
 * @param districtName - Name of the district
 */
export const getBDSubDistrictByDistrict = async (
  districtName: string,
): Promise<string[]> => {
  try {
    const response = await axios.get<SubDistrictResponse>(
      `${BASE_URL}/district/${encodeURIComponent(districtName)}`,
    )

    return response.data?.data?.[0]?.upazillas || []
  } catch (error) {
    console.error(`Error fetching sub-districts for ${districtName}:`, error)
    return []
  }
}
