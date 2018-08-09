// interface defining the state.
export interface State {
  isLoading: boolean;
}

// initial state.
const initialState: State = {
  isLoading: false
}

// reducer for the entire app.
export function appReducer(state = initialState, action) {
  switch (action.type) {
    case "START_LOADING" :
      return { isLoading: true };
    case "STOP_LOADING" :
      return { isLoading: false };
    default :
      return state;
  }
}