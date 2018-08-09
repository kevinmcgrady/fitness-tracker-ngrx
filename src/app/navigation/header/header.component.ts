import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  // new event emitter to make the navigation close and open.
  @Output() sideNavToggle = new EventEmitter<void>();
  // property to store if the user is logged in or not.
  isAuth$: Observable<boolean>;
  // property to store the subscription.
  authSub: Subscription;

  constructor(private store: Store<fromRoot.State>, private authService: AuthService) { }

  ngOnInit() {
    // store the isAuthenticated value from the store in the isAuth property.
    this.isAuth$ = this.store.select(fromRoot.getIsAuth);
  }

  // this method is called when the button is clicked.
  onToggleSidenav() {
    // emit the sideNavToggle event emitter.
    this.sideNavToggle.emit();
  }

  // method to log the user out.
  onLogout() {
    // call the logout method in the auth service.
    this.authService.logout();
  }
}
