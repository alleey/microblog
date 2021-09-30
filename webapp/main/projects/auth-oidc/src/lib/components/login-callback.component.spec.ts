import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OidcAuthService } from '../services/auth.service';
import { LoginCallbackComponent } from './login-callback.component';

describe('LoginCallbackComponent', () => {
  let component: LoginCallbackComponent;
  let fixture: ComponentFixture<LoginCallbackComponent>;
  let service: jasmine.SpyObj<OidcAuthService>;

  beforeEach(async () => {

    service = jasmine.createSpyObj<OidcAuthService>('OidcAuthService', 
      ['completeSignin']
    );

    await TestBed.configureTestingModule({
      declarations: [ LoginCallbackComponent ],
      providers: [
        { provide: OidcAuthService, useValue: service }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginCallbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call completeSignin', () => {
    fixture.detectChanges();
    expect(service.completeSignin).toHaveBeenCalled();
  });
});
