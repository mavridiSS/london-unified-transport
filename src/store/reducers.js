const initialState = {
  value: 5
};

function TestReducer(state = initialState, action) {
  switch (action.type) {
    case "Test":
      return {
        ...state,
        value: action.value
      };
    default:
      return state;
  }
}

export default TestReducer;
