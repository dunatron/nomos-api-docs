import { combineReducers } from "redux";

import token from './tokenReducer';
import higlightStyle from './highlightReducer'
import codeExamples from './codeExamplesReducer'

export default combineReducers({
  token,
  codeExamples, 
  higlightStyle
})