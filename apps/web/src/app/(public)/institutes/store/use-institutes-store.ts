import { create } from "zustand"

interface InstitutesState {
  name?: string
  instituteCategoryId?: string
  institutesFiltering: (data: {
    name?: string
    instituteCategoryId?: string
  }) => void
  resetInstitutesFiltering: () => void
}

export const useGetInstitutesStore = create<InstitutesState>((set) => ({
  name: "",
  instituteCategoryId: "",

  institutesFiltering: (data) =>
    set(() => ({
      name: data.name?.trim(),
      instituteCategoryId: data.instituteCategoryId,
    })),

  resetInstitutesFiltering: () =>
    set(() => ({
      name: "",
      instituteCategoryId: "",
    })),
}))
