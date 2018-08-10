const defaultState = {
  pageAttributes: {
    sizeName: "A4",
    screenDPI: 96,
    pageWidth: 794,
    pageHeight: 1123,
  },
}

export default (state = defaultState, action) => {
  console.log("PLEASE JUST BE CALLED")
  switch (action.type) {
    case "SET_DPI":
      console.log("FFS")
      return {
        ...state,
        pageAttributes: {
          sizeName: "A7",
          screenDPI: 96,
          pageWidth: 794,
          pageHeight: 1123,
        },
      }
    default:
      return state
  }
}
