import { Injectable } from '@angular/core';
import { Exercise } from './exercise.model';
import { Subject } from 'rxjs/subject';
import { AngularFirestore } from 'angularfire2/firestore';
import { map, take } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { UIService } from '../shared/ui.service';
import * as fromRoot from '../app.reducer';
import { Store } from '@ngrx/store';
import * as UI from '../shared/ui.actions';
import * as Training from './training.actions';

@Injectable()
export class TrainingService {
  // list of exercises.
  private availableExercises: Exercise[] = [];
  // propety to store a subject when the exercise has changed.
  exerciseChanged = new Subject<Exercise>();
  // a new subject to push the exercises.
  exercisesChanged = new Subject<Exercise[]>();
  // a subject to store the finished exercises
  finishedExercisesChanged = new Subject<Exercise[]>();
  // propertys to store both the database subscriptions.
  fbSubs: Subscription[] = [];

  constructor(private db: AngularFirestore, private uiService: UIService, private store: Store<fromRoot.State>) { }

  // method to get the exercises
  fetchExercises() {
    // set loading to true.
    this.store.dispatch(new UI.StartLoading());
    // return a new array of the availableExercises.
    this.fbSubs.push(this.db.collection<Exercise>('avaliableExercises')
    .snapshotChanges()
    .pipe(map(docArray => {
      return docArray.map(doc => {
        // return a object with the id and the rest of the data (name, duration ... ).
        return {
          id: doc.payload.doc.id,
          name: doc.payload.doc.data().name,
          duration: doc.payload.doc.data().duration,
          calories: doc.payload.doc.data().calories
        }
      })
    })).subscribe((exersices: Exercise[]) => {
      // set the loading to false.
      this.store.dispatch(new UI.StopLoading());
      // send the exercises to the store.
      this.store.dispatch(new Training.SetAvailableTrainings(exersices));
    }, (error) => {
      // set loading to false.
      this.store.dispatch(new UI.StopLoading());
      // if there is an error, show the snackbar.
      this.uiService.showSnackBar('Fetching Exercises Failed', 'ERROR', 3000);
      // push null to the exercisesChanged.
      this.exercisesChanged.next(null);
    }))
  }

  // method to start the exercise.
  startExercise(selectedId: string) {
    this.store.dispatch(new Training.StartTraining(selectedId));
  }

  // metod called when a exercise is completed.
  completeExercise() {
    this.store.select(fromRoot.getActiveTraining).pipe(take(1)).subscribe(ex => {
      // add the completed exercise to the array.
      // send a copy of the runningExercise with the aditional properties, date and state.
      this.addDataToDatabase({...ex, date: new Date(), state: 'completed'});
      // call the StopTraining action on the store.
      this.store.dispatch(new Training.StopTraining());
    })
  }

  // this method is called when the exercise is cancelled.
  cancelExercise(progress: number) {
    this.store.select(fromRoot.getActiveTraining).pipe(take(1)).subscribe(ex => {
      // add the completed exercise to the array.
      // send a copy of the runningExercise with the aditional properties, date and state.
      this.addDataToDatabase({...ex, duration: ex.duration * (progress / 100) ,calories: ex.calories * (progress / 100), date: new Date(), state: 'cancelled'});
      // call the StopTraining action on the store.
      this.store.dispatch(new Training.StopTraining());
    })
  }

  // method to get all the past exercises.
  fetchCompletedOrCancelledExercises() {
    // get the finished exercises from the database.
    this.fbSubs.push(this.db.collection('finishedExercises').valueChanges().subscribe((exercises: Exercise[]) => {
      // pass the finished exercises to the store.
      this.store.dispatch(new Training.SetFinishedTrainings(exercises));
    }));
  }

  // method to add to the database.
  private addDataToDatabase(exercise: Exercise) {
    // make a call to the database and store the exercise.
    this.db.collection('finishedExercises').add(exercise);
  }

  // method to cancel the subscriptions.
  cancelSubscriptions() {
    this.fbSubs.forEach(sub => sub.unsubscribe());
  }
}
