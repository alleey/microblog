import { HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { OidcAuthService, User } from '../services/auth.service';

import { AuthInterceptor } from './auth.interceptor';

describe('AuthInterceptor', () => {
  let service: jasmine.SpyObj<OidcAuthService>;
  let request: jasmine.SpyObj<HttpRequest<unknown>>;

  beforeEach(() => {
    service = jasmine.createSpyObj<OidcAuthService>('OidcAuthService', 
      ['completeSignin'], {
        userSubject: new BehaviorSubject<any>(undefined)
      }
    );
    request = jasmine.createSpyObj<HttpRequest<unknown>>('HttpRequest',
      ["clone"]
    );

    TestBed.configureTestingModule({
      providers: [
        AuthInterceptor,
        { provide: OidcAuthService, useValue: service }
      ]
     });
  });

  it('should add Authorization header when the user is logged in', fakeAsync(() => {

    const interceptor: AuthInterceptor = TestBed.inject(AuthInterceptor);
    const fakeUser = {
      token_type: 'my_type',
      access_token: "dummy"
    } as User;
    
    const handler = {
      handle:  jasmine.createSpy('handle').and.callFake(() => of(new HttpResponse()))
    };

    service.userSubject.next(fakeUser);
    tick();
    interceptor.intercept(request, handler);
    const header = interceptor.authorizationHeader;
    const extraHeaders = {
      setHeaders: {
        Authorization: header
      }
    };

    expect(header).toEqual(`${fakeUser.token_type} ${fakeUser.access_token}`);
    expect(request.clone).toHaveBeenCalledWith(extraHeaders);
    expect(handler.handle).toHaveBeenCalled();
  }));

  it('should NOT add Authorization header when the user is NOT logged in', fakeAsync(() => {

    const interceptor: AuthInterceptor = TestBed.inject(AuthInterceptor);
    const handler = {
      handle:  jasmine.createSpy('handle').and.callFake(() => of(new HttpResponse()))
    };

    service.userSubject.next(null);
    tick();
    interceptor.intercept(request, handler);

    expect(request.clone).not.toHaveBeenCalled();
    expect(handler.handle).toHaveBeenCalled();
  }));
});
