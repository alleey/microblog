import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OidcAuthService } from '../services/auth.service';
import { LogoutCallbackComponent } from './logout-callback.component';

describe('LogoutCallbackComponent', () => {
  let component: LogoutCallbackComponent;
  let fixture: ComponentFixture<LogoutCallbackComponent>;
  let service: jasmine.SpyObj<OidcAuthService>;

  beforeEach(async () => {

    service = jasmine.createSpyObj<OidcAuthService>('OidcAuthService', 
      ['completeSignout']
    );

    await TestBed.configureTestingModule({
      declarations: [ LogoutCallbackComponent ],
      providers: [
        { provide: OidcAuthService, useValue: service }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogoutCallbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call completeSignout', () => {
    fixture.detectChanges();
    expect(service.completeSignout).toHaveBeenCalled();
  });
});
