import { Action } from '@ngrx/store';
import { AuthActions, SET_AUTHENTICATED, SET_UNAUTHENTICATED } from './auth.actions';

// the structure of the auth state.
export interface State {
    isAuthenticated: boolean;
}

// the initialState of the auth reducer.
const initialState: State = {
  isAuthenticated: false
}

// The UI Reducer, with the initialState passed in.
export function authReducer(state = initialState, action: AuthActions) {
  switch(action.type) {
    // if the action us START_LOADING, return a new object with is isLoading to true.
    case SET_AUTHENTICATED:
      return { isAuthenticated: true };
      // if the action us STOP_LOADING, return a new object with is isLoading to false.
    case SET_UNAUTHENTICATED:
      return { isAuthenticated: false };
    default:
      // dafault, return the state.
      return state;
  }
}

// function that takes a state and returns the isLoading value (true or false).
export const getIsAuth = (state: State) => state.isAuthenticated;