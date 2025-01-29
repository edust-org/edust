interface ShearPageLinkState {
  link: string
}

export enum ShearPageLink {
  ADD_LINK = "ADD_LINK",
}

type ShearPageLinkAction = { type: ShearPageLink.ADD_LINK; link: string }

const shearPageLinkReducer = (
  state: ShearPageLinkState,
  action: ShearPageLinkAction,
): ShearPageLinkState => {
  switch (action.type) {
    case ShearPageLink.ADD_LINK:
      return { ...state, link: action.link }
    default:
      return state
  }
}

export default shearPageLinkReducer
