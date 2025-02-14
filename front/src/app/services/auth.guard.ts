import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { error } from 'console';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const isLoggedIn = this.authService.isLoggedIn();
    const isReferee = this.authService.isReferee();
    const currentUrl = state.url;
    if (!isLoggedIn) {
      this.router.navigate(['/login']);
      return false;
    } else if (isLoggedIn && !isReferee) {
      if (
        currentUrl === '/match-manager' ||
        currentUrl.startsWith('/match-update')
      ) {
        this.router.navigate(['/login']);
        return false;
      }
    } else if (isLoggedIn && isReferee) {
      if (
        currentUrl !== '/match-manager' &&
        !currentUrl.startsWith('/match-update')
      ) {
        this.router.navigate(['/login']);
        return false;
      }
    }
    return true;
  }
}
