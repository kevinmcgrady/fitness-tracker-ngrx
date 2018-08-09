import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit, AfterViewInit, OnDestroy {
  // the columns to display in the columns. (in the table)
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  // property to store the datasourse for the table.
  dataSource = new MatTableDataSource<Exercise>();
  // get the matsort from the view templete on the table.
  @ViewChild(MatSort) sort: MatSort;
  // get the MatPaginator from the view templete.
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // property to store the subject subscription.
  finishedExercisesSub: Subscription;

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    // subscribe to the finishedExercisesChanged subject.
    this.finishedExercisesSub = this.trainingService.finishedExercisesChanged.subscribe((exercises: Exercise[]) => {
      // assign the returned data to the dataSource.data (the data in the table).
      this.dataSource.data = exercises;
    });
    // call the method to get the completed exercises.
    this.trainingService.fetchCompletedOrCancelledExercises();
  }

  // this method will be called after the view has finished loading.
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    // assign the paginator to the paginator propety on the dataSource.
    this.dataSource.paginator = this.paginator;
  }

  // this method will be called when a user types in the filter field.
  doFilter(filterValue: string) {
    // set the filter peoperty of the dataSource to the value the user entered.
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // this method will be called when the component is no longer in use.
  ngOnDestroy() {
    // unsubscribe from the subscription.
    this.finishedExercisesSub.unsubscribe();
  }

}
