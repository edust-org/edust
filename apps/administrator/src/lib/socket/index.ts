import { ManagerOptions, Socket, SocketOptions, io } from "socket.io-client"

const socketMap = new Map<string, Socket>()

export const getSocket = (
  url: string,
  options?: Partial<ManagerOptions & SocketOptions>,
): Socket => {
  if (!socketMap.has(url)) {
    const newSocket = io(url, {
      withCredentials: true,
      ...options,
    })
    socketMap.set(url, newSocket)
  }
  return socketMap.get(url)!
}

export * from "./event-registry"
export * from "./events-name"
export * from "./handlers"
