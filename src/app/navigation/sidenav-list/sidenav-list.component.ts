import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy {
  // this is a new event emitter to close the side nav when the links are clicked.
  @Output() closeSideNav = new EventEmitter<void>();
  // property to store the auth status.
  isAuth: boolean;
  // property to store the subsciption.
  authSub: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    // subscibe to the authChange subject and store the subscription in the authSub.
    this.authSub = this.authService.authChange.subscribe((authStatus) => {
      // set the isAuth to the returned auth status.
      this.isAuth = authStatus;
    })
  }

  // this method is called when a link is clicked.
  onClose() {
    // emit the closeSideNav event emitter.
    this.closeSideNav.emit();
  }

  // this method is called when the component is no longer in use.
  ngOnDestroy() {
    // unsubscribe from the subscription.
    this.authSub.unsubscribe();
  }

  // method to log the user out.
  onLogout() {
    // close the sidenav
    this.onClose();
    // call the logout method on the auth service.
    this.authService.logout();
  }
}
