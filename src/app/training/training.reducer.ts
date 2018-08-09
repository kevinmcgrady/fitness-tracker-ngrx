import { Action } from '@ngrx/store';
import { TrainingActions, SET_FINISHED_TRAININGS, SET_AVAILABLE_TRAININGS, START_TRAINING, STOP_TRAINING } from './training.actions';
import { Exercise } from './exercise.model';

// the structure of the training state.
export interface State {
    availableExercises: Exercise[];
    finishedExercises: Exercise[];
    activeTraining: Exercise;

}

// the initialState of the auth reducer.
const initialState: State = {
  availableExercises: [],
  finishedExercises: [],
  activeTraining: null
}

// The UI Reducer, with the initialState passed in.
export function trainingReducer(state = initialState, action: TrainingActions) {
  switch(action.type) {
    case SET_AVAILABLE_TRAININGS:
      return { ...state, availableExercises: action.payload };
    case SET_FINISHED_TRAININGS:
      return { ...state, finishedExercises: action.payload };
    case START_TRAINING:
      return { ...state, activeTraining: state.availableExercises.find(ex => ex.id === action.payload) };
    case STOP_TRAINING:
      return { ...state, activeTraining: null };
    default:
      return state;
  }
}

// function that takes a state and returns the isLoading value (true or false).
export const getAvailableExercises = (state: State) => state.availableExercises;
export const getFinishedExercises = (state: State) => state.finishedExercises;
export const getActiveTraining = (state: State) => state.activeTraining;
export const getIsTraining = (state: State) => state.activeTraining != null;