const defaultState = {
  appDrawerIsOpen: false,
}
export default (state = defaultState, action) => {
  switch (action.type) {
    case "TOGGLE_APP_DRAWER":
      return {
        ...state,
        appDrawerIsOpen: !state.appDrawerIsOpen,
      }
    default:
      return state
  }
}
