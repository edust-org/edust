import { ReactNode } from "react"

import CounterProvider from "./counter"
import { PageContextProps, PageProvider } from "./page"
import { RightPanelProvider } from "./right-panel"
import { StoreProvider } from "./store"

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
    <StoreProvider>
      <CounterProvider>
        <PageProvider {...pageOptions}>
          <RightPanelProvider>{children}</RightPanelProvider>
        </PageProvider>
      </CounterProvider>
    </StoreProvider>
  )
}
