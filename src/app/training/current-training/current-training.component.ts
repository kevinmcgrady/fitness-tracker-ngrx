import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { StopTrainingComponent } from '../stop-training.component';
import { TrainingService } from '../training.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  // property to store the current progress.
  progress = 0;
  // property to store the timer.
  timer: number;
  // property to store the message.
  message: string = 'Keep Going, You can do it!';

  // inject the MatDialog class and the training service.
  constructor(private dialog: MatDialog, private trainingService: TrainingService, private store: Store<fromRoot.State>) { }

  ngOnInit() {
    // call the method to start the timer.
    this.startOrResumeTimer();
  }

  // this method will start or resume the timer.
  startOrResumeTimer() {
    this.store.select(fromRoot.getActiveTraining).pipe(take(1)).subscribe((ex) => {
      // get the duration of the current exercise in milliseconds.
      const step = ex.duration / 100 * 1000;
      // a timer to increment the progress spinner.
      this.timer = setInterval(() => {
        // increment the progress spinner.
        this.progress = this.progress + 1;
        // if the number is greater or equal to 100 (%)
        if(this.progress >= 100) {
          this.trainingService.completeExercise();
          // stop the timer.
          clearInterval(this.timer);
        }
      }, step)
    })
  }

  // this method will be called when the stop button is clicked.
  onStop() {
    // stop the timer.
    clearInterval(this.timer);
    // open the dialog.
    // pass in the data of the progress.
    const dialogRef = this.dialog.open(StopTrainingComponent, { data: { progress: this.progress } });

    // this method will be called when the model is closed, the data is passed from the model component.
    dialogRef.afterClosed().subscribe((result) => {
      // if the result is true (the user wants to stop the training.)
      if(result) {
        // call the trainingService cancelExercise method and pass in the current progress.
        this.trainingService.cancelExercise(this.progress);
      } else {
        // call the method to resume the timer.
        this.startOrResumeTimer();
      }
    })
  }
}
