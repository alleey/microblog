import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OidcAuthService } from '../services/auth.service';
import { LogoutRedirectComponent } from './logout-redirect.component';

describe('LogoutRedirectComponent', () => {
  let component: LogoutRedirectComponent;
  let fixture: ComponentFixture<LogoutRedirectComponent>;
  let service: jasmine.SpyObj<OidcAuthService>;

  beforeEach(async () => {

    service = jasmine.createSpyObj<OidcAuthService>('OidcAuthService', 
      ['startSignout']
    );

    await TestBed.configureTestingModule({
      declarations: [ LogoutRedirectComponent ],
      providers: [
        { provide: OidcAuthService, useValue: service }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutRedirectComponent);
    component = fixture.componentInstance;
  });

  it('should call startSignout', () => {
    fixture.detectChanges();
    expect(service.startSignout).toHaveBeenCalled();
  });
});
