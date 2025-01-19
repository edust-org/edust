import { restCountriesApi } from "./restcountries"

export const rootReducer_OthersApi = {
  [restCountriesApi.reducerPath]: restCountriesApi.reducer,
}

export const rootMiddleware_OthersApi = [restCountriesApi.middleware]
