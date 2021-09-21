import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { OidcAuthService, User } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  user: User|null = null;

  constructor(private authService: OidcAuthService)
  {
    this.authService.userSubject.subscribe(user => {
      this.user = user;
    });
  }

  get authorizationHeader(): string {
    const user = this.user!;
    return `${user.token_type} ${user.access_token}`;
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if(!!this.user) {
      //console.log("Adding authentication header");
      request = request.clone({
        setHeaders: {
          Authorization: this.authorizationHeader
        }
      });
    } else {
      //console.log("Not adding authentication header");
    }

    return next.handle(request);
  }
}
