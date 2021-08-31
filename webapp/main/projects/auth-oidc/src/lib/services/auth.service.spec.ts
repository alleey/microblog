import { TestBed } from '@angular/core/testing';

import { OidcAuthService } from './auth.service';

describe('AuthService', () => {
  let service: OidcAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OidcAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
