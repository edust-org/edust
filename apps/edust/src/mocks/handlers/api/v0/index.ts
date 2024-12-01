import { auth } from "./auth"
import { institutes } from "./institutes"
import { organizations } from "./organizations"
import { publicApi } from "./public"
import { user } from "./user"

export const apiV0 = [
  ...publicApi,
  ...auth,
  user,
  ...institutes,
  ...organizations,
]
