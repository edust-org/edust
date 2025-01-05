import { ReactNode } from "react"
import CounterProvider from "./counter"
import { PageProvider } from "./page"

interface ContextProps {
  pageOptions: {
    addANewPage: (formData: { pageName: string }) => boolean
  }
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
      <PageProvider addANewPage={pageOptions.addANewPage}>
        {children}
      </PageProvider>
    </CounterProvider>
  )
}
