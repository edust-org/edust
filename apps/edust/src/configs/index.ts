interface DefaultValues {
  backendURL: string
  useMocks: boolean
  formSpreedID: string
  contactWhatsAppLink: string
  discordLink: string
  mobileNumber: string
}

export const defaultValues: DefaultValues = {
  backendURL: import.meta.env.VITE_BACKEND_URL,
  useMocks: import.meta.env.VITE_USE_MOCKS === "true",
  formSpreedID: import.meta.env.VITE_FORM_SPREE_ID,
  contactWhatsAppLink: "https://api.whatsapp.com/send?phone=8801760255882",
  discordLink: "https://discord.gg/vnhqmn9mdj",
  mobileNumber: "+8801760255882",
}
