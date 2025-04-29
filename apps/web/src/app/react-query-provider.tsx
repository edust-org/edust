"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import { useState } from "react"

export default function ReactQueryProvider({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [queryClient] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          retry: 0,
          staleTime: 1000 * 60 * 5, // 5 minutes
        },
      },
    }),
  )
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
