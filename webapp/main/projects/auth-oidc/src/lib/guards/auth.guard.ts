import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { OidcAuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  hasProfile = false;

  constructor(
    private router: Router,
    private authService: OidcAuthService) 
  {
    this.authService.userSubject.subscribe(user => {
      this.hasProfile = !!user;
    });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if(this.hasProfile) {
        return true;
      }

      this.router.navigate(['/oidc-auth/login'], { queryParams: { returnUrl: state.url }});
      return false;
  }
}
