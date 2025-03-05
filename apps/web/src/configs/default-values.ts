export const defaultValues = {
  isMocksApiEnable:
    process.env.NEXT_PUBLIC_IS_MOCKS_API_ENABLE === "true" ? true : false,
  frontendURL: process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000",
}
