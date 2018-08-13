const defaultState = {
  Name: undefined,
  Description: undefined,
  HttpRequest: undefined,
  PermittedCall: undefined,
  QueryParams: [],
  CodeExamples: [],
}
export default (state = defaultState, action) => {
  switch (action.type) {
    case "SET_CURRENT_METHOD":
      console.log("UMM WTF ?")
      const {
        ID,
        Name,
        Description,
        HttpRequest,
        PermittedCall,
        CodeExamples,
        QueryParams,
      } = action.payload
      return {
        ...state,
        ID,
        Name,
        Description,
        HttpRequest,
        PermittedCall,
        CodeExamples,
        QueryParams,
      }
    default:
      return state
  }
}
