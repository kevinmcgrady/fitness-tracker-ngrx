import { Action } from '@ngrx/store';
import { UIActions, START_LOADING, STOP_LOADING } from './ui.actions';

// the structure of the ui state.
export interface State {
    isLoading: boolean;
}

// the initialState of the UI reducer.
const initialState: State = {
  isLoading: false
}

// The UI Reducer, with the initialState passed in.
export function uiReducer(state = initialState, action: UIActions) {
  switch(action.type) {
    // if the action us START_LOADING, return a new object with is isLoading to true.
    case START_LOADING:
      return { isLoading: true };
      // if the action us STOP_LOADING, return a new object with is isLoading to false.
    case STOP_LOADING:
      return { isLoading: false };
    default:
      // dafault, return the state.
      return state;
  }
}

// function that takes a state and returns the isLoading value (true or false).
export const getIsLoading = (state: State) => state.isLoading;