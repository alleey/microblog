import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OidcAuthService } from 'auth-oidc';
import { BehaviorSubject } from 'rxjs';
import { FollowingService } from '../../services/following.service';

import { FollowingListComponent } from './following-list.component';

describe('FollowingListComponent', () => {
  let component: FollowingListComponent;
  let fixture: ComponentFixture<FollowingListComponent>;
  let service: jasmine.SpyObj<FollowingService>;
  let authService: jasmine.SpyObj<OidcAuthService>;

  beforeEach(async () => {

    service = jasmine.createSpyObj<FollowingService>('FollowingService', 
      ['following'], {
        onChange: new BehaviorSubject<any>(undefined)
      }
    );
    authService = jasmine.createSpyObj<OidcAuthService>('OidcAuthService', 
      [], {
        userSubject: new BehaviorSubject<any>(undefined)
      }
    );

    await TestBed.configureTestingModule({
      declarations: [ FollowingListComponent ],
      providers: [
        { provide: FollowingService, useValue: service },
        { provide: OidcAuthService, useValue: authService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FollowingListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
