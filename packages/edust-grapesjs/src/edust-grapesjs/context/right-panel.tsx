import { ActivePanel } from "@/types"

import React, { ReactNode, createContext, useContext, useReducer } from "react"

interface RightPanelState {
  activePanel: ActivePanel
}

const initialState: RightPanelState = {
  activePanel: ActivePanel.BLOCKS,
}

type RightPanelActiveAction =
  | { type: ActivePanel.SELECTORS }
  | { type: ActivePanel.TRAITS }
  | { type: ActivePanel.BLOCKS }

function activePanelReducer(
  state: RightPanelState,
  action: RightPanelActiveAction,
): RightPanelState {
  switch (action.type) {
    case ActivePanel.SELECTORS:
      return { ...state, activePanel: ActivePanel.SELECTORS }
    case ActivePanel.TRAITS:
      return { ...state, activePanel: ActivePanel.TRAITS }
    case ActivePanel.BLOCKS:
      return { ...state, activePanel: ActivePanel.BLOCKS }
    default:
      return state
  }
}

// Define the context value type
interface RightPanelContextType {
  state: RightPanelState
  dispatch: React.Dispatch<RightPanelActiveAction>
}

const RightPanelContext = createContext<RightPanelContextType | undefined>(
  undefined,
)

// Custom hook to use the context
export const useRightPanelContext = () => {
  const context = useContext(RightPanelContext)
  if (!context) {
    throw new Error(
      "useRightPanelContext must be used within a RightPanelProvide",
    )
  }
  return context
}

// Provider component
interface RightPanelProviderProps {
  children: ReactNode
}

export const RightPanelProvider: React.FC<RightPanelProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(activePanelReducer, initialState)

  return (
    <RightPanelContext.Provider value={{ state, dispatch }}>
      {children}
    </RightPanelContext.Provider>
  )
}
