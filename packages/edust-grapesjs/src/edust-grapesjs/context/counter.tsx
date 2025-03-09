import React, { ReactNode, createContext, useContext, useReducer } from "react"

// Define action types
type CounterAction = { type: "increment" } | { type: "decrement" }

// Define state type
type CounterState = { count: number }

// Define initial state
const initialState: CounterState = { count: 0 }

// Reducer function
const counterReducer = (
  state: CounterState,
  action: CounterAction,
): CounterState => {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 }
    case "decrement":
      return { count: state.count - 1 }
    default:
      return state
  }
}

// Create context
const CounterContext = createContext<{
  state: CounterState
  dispatch: React.Dispatch<CounterAction>
} | null>(null)

// Custom hook to use the Counter context
export const useCounter = () => {
  const context = useContext(CounterContext)
  if (!context) {
    throw new Error("useCounter must be used within a CounterProvider")
  }
  return context
}

// Provider component
const CounterProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(counterReducer, initialState)

  return (
    <CounterContext.Provider value={{ state, dispatch }}>
      {children}
    </CounterContext.Provider>
  )
}

export default CounterProvider
