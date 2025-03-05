import { bdapisApi } from "./bdapis"
import { restCountriesApi } from "./restcountries"

export const rootReducer_OthersApi = {
  [restCountriesApi.reducerPath]: restCountriesApi.reducer,
  [bdapisApi.reducerPath]: bdapisApi.reducer,
}

export const rootMiddleware_OthersApi = [
  restCountriesApi.middleware,
  bdapisApi.middleware,
]
