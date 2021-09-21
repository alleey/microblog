import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OidcAuthService } from 'auth-oidc';
import { BehaviorSubject } from 'rxjs';
import { FollowingService } from '../../services/following.service';

import { FollowingBadgeComponent } from './following-badge.component';

describe('FollowingBadgeComponent', () => {
  let component: FollowingBadgeComponent;
  let fixture: ComponentFixture<FollowingBadgeComponent>;
  let service: jasmine.SpyObj<FollowingService>;
  let authService: jasmine.SpyObj<OidcAuthService>;

  beforeEach(async () => {

    service = jasmine.createSpyObj<FollowingService>('FollowingService', 
      ['findFollowing', 'follow', 'unfollow'], {
        onChange: new BehaviorSubject<any>(undefined)
      }
    );
    authService = jasmine.createSpyObj<OidcAuthService>('OidcAuthService', 
      [], {
        userSubject: new BehaviorSubject<any>(undefined)
      }
    );

    await TestBed.configureTestingModule({
      declarations: [ FollowingBadgeComponent ],
      providers: [
        { provide: FollowingService, useValue: service },
        { provide: OidcAuthService, useValue: authService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FollowingBadgeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
