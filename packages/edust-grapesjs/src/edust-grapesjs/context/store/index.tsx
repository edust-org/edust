import { ReactNode, createContext, useContext, useReducer } from "react"

const initialState = {
  link: "",
}

export type StoreAction = { type: StoreLink.ADD_LINK; link: string }

export interface StoreState {
  link: string
}

export enum StoreLink {
  ADD_LINK = "ADD_LINK",
}

const storeReducer = (state: StoreState, action: StoreAction): StoreState => {
  switch (action.type) {
    case StoreLink.ADD_LINK:
      return { ...state, link: action.link }
    default:
      return state
  }
}

const StoreContext = createContext<{
  state: StoreState
  dispatch: React.Dispatch<StoreAction>
} | null>(null)

export const useStoreContext = () => {
  const context = useContext(StoreContext)
  if (!context) {
    throw new Error("useStoreContext must be used within mainApp")
  }
  return context
}

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(storeReducer, initialState)

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  )
}
