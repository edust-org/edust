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
    console.log("New socket instance created")
  }
  return socket
}

export * from "./events-name"
