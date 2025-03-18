interface State {
  query: { name?: string }
  searchTimeout: number | null
  isSearching: boolean
}

const initialState: State = {
  query: {},
  searchTimeout: null,
  isSearching: false,
}

enum ActionTypes {
  SET_QUERY_NAME = "SET_QUERY_NAME",
  SET_SEARCH_TIMEOUT = "SET_SEARCH_TIMEOUT",
  ENABLE_IS_SEARCHING = "ENABLE_IS_SEARCHING",
  DISENABLE_IS_SEARCHING = "DISENABLE_IS_SEARCHING",
}

type Action =
  | { type: ActionTypes.SET_QUERY_NAME; name: string }
  | { type: ActionTypes.SET_SEARCH_TIMEOUT; searchTimeout: number | null }
  | {
      type: ActionTypes.ENABLE_IS_SEARCHING | ActionTypes.DISENABLE_IS_SEARCHING
    }

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionTypes.SET_QUERY_NAME:
      return {
        ...state,
        query: { ...state.query, name: action.name },
      }
    case ActionTypes.SET_SEARCH_TIMEOUT:
      return {
        ...state,
        searchTimeout: action.searchTimeout,
      }
    case ActionTypes.ENABLE_IS_SEARCHING:
      return {
        ...state,
        isSearching: true,
      }
    case ActionTypes.DISENABLE_IS_SEARCHING:
      return {
        ...state,
        isSearching: false,
      }
    default:
      return state
  }
}

export default { initialState, reducer, ActionTypes }
