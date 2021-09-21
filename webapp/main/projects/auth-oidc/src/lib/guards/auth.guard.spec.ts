import { TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

import { AuthGuard } from './auth.guard';
import { OidcAuthService, User } from '../services/auth.service';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let service: jasmine.SpyObj<OidcAuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    service = jasmine.createSpyObj<OidcAuthService>('OidcAuthService', 
      ['completeSignin'], {
        userSubject: new BehaviorSubject<any>(undefined)
      }
    );
    router = jasmine.createSpyObj<Router>('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: router },
        { provide: OidcAuthService, useValue: service }
      ]
     });
    guard = TestBed.inject(AuthGuard);
  });

  it('should prevent navigation when user is not logged in', () => {

    service.userSubject.next(null);

    const snapshot = {} as ActivatedRouteSnapshot;
    const routerState = { url: "test" } as RouterStateSnapshot;
    const result = guard.canActivate(snapshot, routerState);

    expect(result).toBeFalse();
    expect(router.navigate).toHaveBeenCalled();
  });

  it('should allow navigation when user is logged in', () => {

    service.userSubject.next({} as User);

    const snapshot = {} as ActivatedRouteSnapshot;
    const routerState = { url: "test" } as RouterStateSnapshot;
    const result = guard.canActivate(snapshot, routerState);

    expect(result).toBeTrue();
    expect(router.navigate).not.toHaveBeenCalled();
  });
});
