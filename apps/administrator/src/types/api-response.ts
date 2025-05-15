export type ApiResponse<T> = {
  status: "SUCCESS" | "ERROR"
  message: string
  data: T
  _link: {
    [key: string]: {
      href: string
      method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
    }
  }
}
