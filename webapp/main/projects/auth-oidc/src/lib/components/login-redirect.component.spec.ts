import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OidcAuthService } from '../services/auth.service';
import { LoginRedirectComponent } from './login-redirect.component';

describe('LoginRedirectComponent', () => {
  let component: LoginRedirectComponent;
  let fixture: ComponentFixture<LoginRedirectComponent>;
  let service: jasmine.SpyObj<OidcAuthService>;

  beforeEach(async () => {

    service = jasmine.createSpyObj<OidcAuthService>('OidcAuthService', 
      ['startSignin']
    );

    await TestBed.configureTestingModule({
      declarations: [ LoginRedirectComponent ],
      providers: [
        { provide: OidcAuthService, useValue: service }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call startSignin', () => {
    fixture.detectChanges();
    expect(service.startSignin).toHaveBeenCalled();
  });
});
