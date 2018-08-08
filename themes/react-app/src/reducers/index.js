import { combineReducers } from "redux"

import token from "./tokenReducer"
import appSettings from "./appSettings"
import higlightStyle from "./highlightReducer"
import codeExamples from "./codeExamplesReducer"

export default combineReducers({
  token,
  appSettings,
  codeExamples,
  higlightStyle,
})
