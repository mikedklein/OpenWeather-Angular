import { NgModule } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Route
} from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [CommonModule]
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.checkLogin();
  }

  checkLogin(): boolean {
    if (this.authService.loggedIn) {
      return true;
    }

    // Navigate to the login page with extras
    this.router.navigate(['/login']);
    return false;
  }
}
