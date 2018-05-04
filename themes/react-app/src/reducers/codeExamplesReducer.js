const defaultState = {
  codeExamples: []
};
export default (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_CODE_EXAMPLES':
      return {
        ...state,
        codeExamples: action.payload
      };
    default:
      return state;
  }
};