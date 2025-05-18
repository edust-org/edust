import * as _others from "./_others"
import * as auth from "./auth"
import * as institutes from "./institutes"
import * as notifications from "./notifications"
import * as organizations from "./organizations"
import * as publicApi from "./public"
import * as support from "./support"

export const v0 = {
  ..._others,
  ...auth,
  ...institutes,
  ...notifications,
  ...organizations,
  ...publicApi,
  ...support,
}
