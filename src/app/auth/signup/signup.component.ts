import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UIService } from '../../shared/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  // a property to store the max date (over 18).
  maxDate: Date;
  // set a property to store the loading state of the spinner.
  isLoading: boolean = false;
  // create a property to store the subscription.
  isLoadingSub: Subscription;

  constructor(private authService: AuthService, private uiService: UIService) { }

  ngOnInit() {
    // subscribe to the subject.
    this.isLoadingSub = this.uiService.loadingStateChanged.subscribe((isLoadingState) => {
      // set the property to the result.
      this.isLoading = isLoadingState;
    });

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

  // method called when component is no longer used.
  ngOnDestroy() {
    // unsubscribe.
    this.isLoadingSub.unsubscribe();
  }
}
