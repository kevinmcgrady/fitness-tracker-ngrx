import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UIService } from '../../shared/ui.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  // property to store the exersices.
  exercises$: Observable<Exercise[]>;
  // store the loading state of the spinner.
  isLoading$: Observable<boolean>;

  constructor(private trainingService: TrainingService, private uiService: UIService, private store: Store<fromRoot.State>) { }

  ngOnInit() {
    // get the isloadin state from the root reducer and assign it to the isLoading$ property.
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);

    // set the results from the database to the exercises property.
    this.exercises$ = this.store.select(fromRoot.getAvailableExercises);

    // fetch the exercises from the database.
    this.fetchExercises();
  }

  // this method will be called when the start new training button is clicked.
  onStartTraining(form: NgForm) {
    // call the startExercise method on the trainingService and pass in the exercise value on the form
    this.trainingService.startExercise(form.value.exercise);
  }

  // method to fetch the exercises.
  fetchExercises() {
    // fetch the exercises from the database.
    this.trainingService.fetchExercises();
  }
}
