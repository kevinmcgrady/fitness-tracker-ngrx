import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';
import { UIService } from '../../shared/ui.service';


@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  // property to store the exersices.
  exercises: Exercise[];
  // property to store the subscription.
  exercisesSub: Subscription;
  // store the loading state of the spinner.
  isLoading: boolean = true;
  // store the subscription.
  isLoadingSub: Subscription;

  constructor(private trainingService: TrainingService, private uiService: UIService) { }

  ngOnInit() {
    // subscribe to the loading state.
    this.isLoadingSub = this.uiService.loadingStateChanged.subscribe((isLoadingState) => {
      // set the property to the value.
      this.isLoading = isLoadingState;
    });

    // set the results from the database to the exercises property.
    this.exercisesSub = this.trainingService.exercisesChanged.subscribe(exercises => {
      this.exercises = exercises;
    });
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

  // this method will be called when the component is no longer in use.
  ngOnDestroy() {
  // unsubscribe from the subscription.
  this.exercisesSub.unsubscribe();
  // unsubscribe.
  this.isLoadingSub.unsubscribe();
  }
}
