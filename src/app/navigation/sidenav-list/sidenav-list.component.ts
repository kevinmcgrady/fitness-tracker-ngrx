import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  // this is a new event emitter to close the side nav when the links are clicked.
  @Output() closeSideNav = new EventEmitter<void>();
  // property to store the auth status.
  isAuth$: Observable<boolean>;

  constructor(private authService: AuthService, private store: Store<fromRoot.State>) { }

  ngOnInit() {
    // get the auth state from the store and assign it to the isAuth$ property.
    this.isAuth$ = this.store.select(fromRoot.getIsAuth);
  }

  // this method is called when a link is clicked.
  onClose() {
    // emit the closeSideNav event emitter.
    this.closeSideNav.emit();
  }


  // method to log the user out.
  onLogout() {
    // close the sidenav
    this.onClose();
    // call the logout method on the auth service.
    this.authService.logout();
  }
}
