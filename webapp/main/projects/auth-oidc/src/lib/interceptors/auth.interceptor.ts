import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { OidcAuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: OidcAuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if(this.authService.isLoggedIn) {
      //console.log("Adding authentication header");
      request = request.clone({
        setHeaders: {
          Authorization: this.authService.authorizationHeader
        }
      });
    } else {
      //console.log("Not adding authentication header");
    }

    return next.handle(request);
  }
}
