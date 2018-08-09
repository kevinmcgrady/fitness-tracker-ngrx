import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class UIService {
  constructor(private snackBar: MatSnackBar) { }

  // new subject for the loading spinner.
  loadingStateChanged = new Subject<boolean>();

  // method to show the snackbar.
  showSnackBar(message, action, duration) {
    this.snackBar.open(message, action, {
      duration: duration
    })
  }
}