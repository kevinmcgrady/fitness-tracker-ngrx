import { Action } from '@ngrx/store';

// actions for the UI reducer.
export const START_LOADING = '[UI] Start Loading';
export const STOP_LOADING = '[UI] Stop Loading';

// action classes for the actions, only has a string defined above.
export class StartLoading implements Action {
  readonly type = START_LOADING;
}

// action classes for the actions, only has a string defined above.
export class StopLoading implements Action {
  readonly type = STOP_LOADING;
}

// export a type that is either StartLoading or StopLoading
export type UIActions = StartLoading | StopLoading;