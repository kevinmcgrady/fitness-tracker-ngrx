import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { UIService } from '../../shared/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  // create a property to store the state of the spinner.
  isLoading: boolean = false;
  // property to store the loading subscription.
  private loadingSub: Subscription;

  constructor(private authService: AuthService, private uiService: UIService) { }

  ngOnInit() {
    // subscribe to the subject.
    this.loadingSub = this.uiService.loadingStateChanged.subscribe((isLoadingState) => {
      // assign the value to the property.
      this.isLoading = isLoadingState;
    });
  }

  // method called when the form is submitted.
  onSubmit(form: NgForm) {
    // call the login method on the service.
    this.authService.login({
      email: form.value.email,
      password: form.value.password
    });
  }

  // this method will be called when the component is no longer in use.
  ngOnDestroy() {
    // unsubscribe
    this.loadingSub.unsubscribe();
  }
}
