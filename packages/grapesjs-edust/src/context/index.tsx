import { ReactNode } from "react"
import CounterProvider from "./counter"

export const ContextProviders = ({ children }: { children: ReactNode }) => {
  return <CounterProvider>{children}</CounterProvider>
}
