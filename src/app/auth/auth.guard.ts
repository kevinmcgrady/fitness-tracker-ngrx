import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // if the user is logged in.
    if(this.authService.isAuth()) {
      // return true (allowed)
      return true;
    } else {
      // else, redirect the user to the login page.
      this.router.navigate(['/login']);
    }
  }
}