import { ReactNode } from "react"
import CounterProvider from "./counter"
import { PageContextProps, PageProvider } from "./page"

interface ContextProps {
  pageOptions: PageContextProps
}

interface ContextProviderProps extends ContextProps {
  children: ReactNode
}

export const ContextProviders = ({
  children,
  pageOptions,
}: ContextProviderProps) => {
  return (
    <CounterProvider>
      <PageProvider {...pageOptions}>{children}</PageProvider>
    </CounterProvider>
  )
}
