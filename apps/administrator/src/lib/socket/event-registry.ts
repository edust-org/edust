type SocketEventHandler = (payload: any) => void

const eventHandlers: Record<string, SocketEventHandler> = {}

// Register an event handler
export const registerEvent = (event: string, handler: SocketEventHandler) => {
  eventHandlers[event] = handler
}

// Dispatch handler if exists
export const dispatchEvent = (event: string, payload: any) => {
  if (eventHandlers[event]) {
    eventHandlers[event](payload)
  }
}
