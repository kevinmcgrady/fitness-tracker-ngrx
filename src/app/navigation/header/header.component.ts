import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  // new event emitter to make the navigation close and open.
  @Output() sideNavToggle = new EventEmitter<void>();
  // property to store if the user is logged in or not.
  isAuth: boolean;
  // property to store the subscription.
  authSub: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    // subscribe to the auth change subject.
    this.authSub = this.authService.authChange.subscribe((authStatus) => {
      // set the isAuth to the returned authStatus.
      this.isAuth = authStatus;
    })
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

  // this method is called when the component is no longer in use.
  ngOnDestroy() {
    // unsubscribe from the observable.
    this.authSub.unsubscribe();
  }
}
