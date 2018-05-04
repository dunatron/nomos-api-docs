import { combineReducers } from "redux";

import token from './tokenReducer';
import codeExamples from './codeExamplesReducer'

export default combineReducers({
  token,
  codeExamples
})