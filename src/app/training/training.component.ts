import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TrainingService } from './training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit, OnDestroy {
  // boolean to store if a training session is active.
  ongoingTraining: boolean = false;
  // property to store the subscription.
  exerciseSub: Subscription;

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    // subscribe to the exerciseChanged subject.
    this.exerciseSub = this.trainingService.exerciseChanged.subscribe((exercise) => {
      // if the exercise is true (its there).
      if(exercise) {
        // set ongoingTraining to true.
        this.ongoingTraining = true;
      } else {
        // if not there, set to false.
        this.ongoingTraining = false;
      }
    });
  }

  // this method will be called when the component is no longer in use.
  ngOnDestroy() {
    // ensubscribe from the subscription.
    this.exerciseSub.unsubscribe();
  }

}
