import * as fromUi from './shared/ui.reducer';
import * as fromAuth from './auth/auth.reducer';
import * as fromTraining from './training/training.reducer';

import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

// an interface that defines the entire app state.
export interface State {
    ui: fromUi.State;
    auth: fromAuth.State;
    training: fromTraining.State;
}

// the app reducer combined with all the other reducers
export const reducers: ActionReducerMap<State> = {
  ui: fromUi.uiReducer,
  auth: fromAuth.authReducer,
  training: fromTraining.trainingReducer
}

// this function only gets the ui section of the app reducer.
export const getUiState = createFeatureSelector<fromUi.State>('ui');
// method that returns the isLoading section, pass in the state returned from the above function and the result of the fromUi.getIsLoading function.
export const getIsLoading = createSelector(getUiState, fromUi.getIsLoading);
// method to get the auth slice of the state.
export const getAuthState = createFeatureSelector<fromAuth.State>('auth');
// method to get the is authenticated property from the auth state.
export const getIsAuth = createSelector(getAuthState, fromAuth.getIsAuth);
// method to get the training slice of the app state.
export const getTrainingState = createFeatureSelector<fromTraining.State>('training');
// method to get the availableExercises, finishedExercises and the activeTraining.
export const getAvailableExercises = createSelector(getTrainingState, fromTraining.getAvailableExercises);
export const getFinishedExercises = createSelector(getTrainingState, fromTraining.getFinishedExercises);
export const getActiveTraining = createSelector(getTrainingState, fromTraining.getActiveTraining);
export const getIsTraining = createSelector(getTrainingState, fromTraining.getIsTraining);