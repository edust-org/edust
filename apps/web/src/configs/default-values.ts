interface DefaultValues {
  frontendURL: string
  backendURL: string
  apiV0URL: string
  formSpreedID: string
  contactWhatsAppLink: string
  discordLink: string
  mobileNumber: string
}

export const defaultValues: DefaultValues = {
  frontendURL: process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000",
  backendURL: process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000",
  apiV0URL: process.env.NEXT_PUBLIC_BACKEND_URL + "/api/v0",

  formSpreedID: process.env.NEXT_PUBLIC_FORM_SPREE_ID || "",
  contactWhatsAppLink: "https://api.whatsapp.com/send?phone=8801760255882",
  discordLink: "https://discord.gg/vnhqmn9mdj",
  mobileNumber: "+8801760255882",
}
