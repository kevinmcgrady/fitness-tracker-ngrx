import { Action } from '@ngrx/store';
import { Exercise } from './exercise.model';

// actions for the auth reducer.
export const SET_AVAILABLE_TRAININGS = '[Training] Set Available Trainings';
export const SET_FINISHED_TRAININGS = '[Training] Set Finished Trainings';
export const START_TRAINING = '[Training] Start Training';
export const STOP_TRAINING = '[Training] Stop Training';

// action classes for the actions, only has a string defined above.
export class SetAvailableTrainings implements Action {
  readonly type = SET_AVAILABLE_TRAININGS;

  constructor(public payload: Exercise[]) { }
}

// action classes for the actions, only has a string defined above.
export class SetFinishedTrainings implements Action {
  readonly type = SET_FINISHED_TRAININGS;

  constructor(public payload: Exercise[]) { }
}

// action classes for the actions, only has a string defined above.
export class StartTraining implements Action {
  readonly type = START_TRAINING;

  constructor(public payload: Exercise) { }
}

// action classes for the actions, only has a string defined above.
export class StopTraining implements Action {
  readonly type = STOP_TRAINING;
}


// export a type that is either StartLoading or StopLoading
export type TrainingActions = SetFinishedTrainings | SetAvailableTrainings | StopTraining | StartTraining;