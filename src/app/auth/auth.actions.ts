import { Action } from '@ngrx/store';

// actions for the auth reducer.
export const SET_AUTHENTICATED = '[Auth] Set Authenticated';
export const SET_UNAUTHENTICATED = '[Auth] Set Unauthenticated';

// action classes for the actions, only has a string defined above.
export class SetAuthenticated implements Action {
  readonly type = SET_AUTHENTICATED;
}

// action classes for the actions, only has a string defined above.
export class SetUnauthenticated implements Action {
  readonly type = SET_UNAUTHENTICATED;
}

// export a type that is either StartLoading or StopLoading
export type AuthActions = SetAuthenticated | SetUnauthenticated;