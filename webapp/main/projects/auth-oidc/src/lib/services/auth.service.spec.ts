import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { OidcAuthConfigToken, OidcAuthService } from './auth.service';

describe('AuthService', () => {
  let service: OidcAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [OidcAuthService, 
        {
          provide: OidcAuthConfigToken,
          useValue: { 
            clientId: '',
          }
        }]
    });
    service = TestBed.inject(OidcAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
