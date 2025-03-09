import type { Editor, Page } from "grapesjs"

import React, { ReactNode, createContext, useContext } from "react"

export interface PageContextProps {
  addANewPage: (data: { pageName: string }, editor: object) => Promise<boolean>
  deletePage: ({
    page,
    editor,
    removePage,
  }: {
    page: Page
    editor: Editor
    removePage: () => void
  }) => Promise<boolean>
  editPageName: ({
    pageName,
    page,
    pages,
    editor,
  }: {
    pageName: string
    page: Page
    pages: Page[]
    editor: Editor
  }) => Promise<boolean>
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
