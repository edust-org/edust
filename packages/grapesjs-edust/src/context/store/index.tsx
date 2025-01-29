import { createContext, useReducer } from "react"






const StoreContext = createContext(null)

export const StoreProvider = ({ children }) => {

  const [state, dispatch] = useReducer()

  return (
    <StoreContext.Provider value={(state, dispatch)}>
      {children}
    </StoreContext.Provider>
  )
}
