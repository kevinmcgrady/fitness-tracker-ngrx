import { Injectable } from '@angular/core';
import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { TrainingService } from '../training/training.service';
import { MatSnackBar } from '@angular/material';
import { UIService } from '../shared/ui.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions';
import * as Auth from './auth.actions';


@Injectable()
export class AuthService {

  constructor(private router: Router, private afAuth: AngularFireAuth, private trainingService: TrainingService, private snackbar: MatSnackBar, private uiService: UIService, private store: Store<fromRoot.State>) { }

  // this method will be called whenever a user auth changes.
  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      // if a user exists.
      if(user) {
        // set isAuthenticated to true.
        this.store.dispatch(new Auth.SetAuthenticated());
        // navigate the user to the training page.
        this.router.navigate(['/training']);
      } else {
        // cancel the database subs.
        this.trainingService.cancelSubscriptions();
        // set isAuthenticated to false.
        this.store.dispatch(new Auth.SetUnauthenticated());
        // navigate the user to the training page.
        this.router.navigate(['/login']);
      }
    })
  }

  // method to register a new user.
  registerUser(authData: AuthData) {
    // start the loading.
    this.store.dispatch(new UI.StartLoading());
    this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password).then((result) => {
      // stop the loading when the user has created an account.
      this.store.dispatch(new UI.StopLoading());
    }).catch((error) => {
      // stop the loading when the user has created an account.
      this.store.dispatch(new UI.StopLoading());
      // open a snackbar and display the error message.
      this.uiService.showSnackBar(error.message, 'ERROR', 3000);
    })
  }

  // method to log the user in.
  login(authData: AuthData) {
    // start the loading.
    this.store.dispatch(new UI.StartLoading());
    this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password).then((result) => {
      // stop the loading when the user has logged in.
      this.store.dispatch(new UI.StopLoading());
    }).catch((error) => {
      // stop the loading when the user has an error.
      this.store.dispatch(new UI.StopLoading());
      // open the snackbar and display the message.
      this.uiService.showSnackBar(error.message, 'ERROR', 3000);
    })
  }

  // method to log the user out.
  logout() {
    // call the signout method on the AngularFireAuth.
    this.afAuth.auth.signOut();
  }

}
