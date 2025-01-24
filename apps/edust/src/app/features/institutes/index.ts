import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface InstitutesState {
  name?: string
  instituteCategoryId?: string
}

const initialState: InstitutesState = {
  name: "",
  instituteCategoryId: "",
}

export const institutesSlice = createSlice({
  name: "institutes",
  initialState,
  reducers: {
    institutesFiltering: (
      state: InstitutesState,
      action: PayloadAction<InstitutesState>,
    ) => {
      state.name = action.payload.name?.trim()
      state.instituteCategoryId = action.payload.instituteCategoryId
    },
    resetInstitutesFiltering: () => initialState,
  },
})

export const { institutesFiltering, resetInstitutesFiltering } =
  institutesSlice.actions

export default institutesSlice.reducer
