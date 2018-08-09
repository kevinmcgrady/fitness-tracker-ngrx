import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TrainingService } from './training.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  // boolean to store if a training session is active.
  ongoingTraining$: Observable<boolean>;

  constructor(private trainingService: TrainingService, private store: Store<fromRoot.State>) { }

  ngOnInit() {
    // get the is training value from the store and assign it to the ongoingTraining$ property.
    this.ongoingTraining$ = this.store.select(fromRoot.getIsTraining);
  }

}
