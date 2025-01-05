import React, { createContext, ReactNode, useContext } from "react"

interface PageContextProps {
  addANewPage: (data: { pageName: string }, editor: object) => boolean
  handleAnotherAction?: (id: number) => void
}

// Initialize the context
const PageContext = createContext<PageContextProps | undefined>(undefined)

// Custom hook to use the context
export const usePageContext = () => {
  const context = useContext(PageContext)
  if (!context) {
    throw new Error("usePageContext must be used within a PageProvider")
  }
  return context
}

// Provider component
interface PageProviderProps extends PageContextProps {
  children: ReactNode
}

export const PageProvider: React.FC<PageProviderProps> = ({
  children,
  ...handlers
}) => {
  return (
    <PageContext.Provider value={handlers}>{children}</PageContext.Provider>
  )
}
