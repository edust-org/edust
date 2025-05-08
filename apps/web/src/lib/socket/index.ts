import { defaultValues } from "@/configs"
import { ManagerOptions, Socket, SocketOptions, io } from "socket.io-client"

let socket: Socket

export const getSocket = (
  options?: Partial<ManagerOptions & SocketOptions>,
): Socket => {
  if (!socket) {
    socket = io(defaultValues.backendURL, {
      withCredentials: true,
      ...options,
    })
  }
  return socket
}

export * from "./event-registry"
export * from "./events-name"
export * from "./handlers"
