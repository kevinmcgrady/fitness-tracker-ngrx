import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { UIService } from '../../shared/ui.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../../app.reducer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // create a property to store the state of the spinner.
  isLoading$: Observable<boolean>;

  constructor(private authService: AuthService, private uiService: UIService, private store: Store<{ ui: fromApp.State }>) { }

  ngOnInit() {
    // get the isLoading state from the store.
    // assign it to the isLoading$ property
    this.isLoading$ = this.store.pipe(map(state => state.ui.isLoading));
  }

  // method called when the form is submitted.
  onSubmit(form: NgForm) {
    // call the login method on the service.
    this.authService.login({
      email: form.value.email,
      password: form.value.password
    });
  }
}
