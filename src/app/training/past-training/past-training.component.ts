import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit, AfterViewInit {
  // the columns to display in the columns. (in the table)
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  // property to store the datasourse for the table.
  dataSource = new MatTableDataSource<Exercise>();
  // get the matsort from the view templete on the table.
  @ViewChild(MatSort) sort: MatSort;
  // get the MatPaginator from the view templete.
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private trainingService: TrainingService, private store: Store<fromRoot.State>) { }

  ngOnInit() {
    // subscribe to the finishedExercisesChanged subject.
    this.store.select(fromRoot.getFinishedExercises).subscribe((exercises: Exercise[]) => {
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

}
