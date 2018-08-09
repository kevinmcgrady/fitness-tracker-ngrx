import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UIService } from '../../shared/ui.service';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  // a property to store the max date (over 18).
  maxDate: Date;
  // set a property to store the loading state of the spinner.
  isLoading$: Observable<boolean>;

  constructor(private authService: AuthService, private uiService: UIService, private store: Store<fromRoot.State>) { }

  ngOnInit() {
    // get the isLoading property from the store and store it in the isLoading$ property.
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    // set the max date to a new date object.
    this.maxDate = new Date();
    // set the full year to the current year - 18.
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  // method called when the form is sumbitted.
  onSubmit(form: NgForm) {
    // call the registerUser method.
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    });
  }
}
