import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OidcAuthService, User } from 'auth-oidc';
import { BehaviorSubject, of } from 'rxjs';
import { FollowingService } from '../../services/following.service';

import { FollowerBadgeComponent } from './follower-badge.component';
import { FollowsListResponseModel, FollowsResponseModel } from '../../models/follows';

describe('FollowerBadgeComponent', () => {
  let component: FollowerBadgeComponent;
  let fixture: ComponentFixture<FollowerBadgeComponent>;
  let service: jasmine.SpyObj<FollowingService>;
  let authService: jasmine.SpyObj<OidcAuthService>;

  beforeEach(async () => {

    service = jasmine.createSpyObj<FollowingService>('FollowingService', 
      ['findFollower'], {
        onChange: new BehaviorSubject<any>(undefined)
      }
    );
    authService = jasmine.createSpyObj<OidcAuthService>('OidcAuthService', 
      [], {
        userSubject: new BehaviorSubject<any>(undefined)
      }
    );

    await TestBed.configureTestingModule({
      declarations: [ FollowerBadgeComponent ],
      providers: [
        { provide: FollowingService, useValue: service },
        { provide: OidcAuthService, useValue: authService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FollowerBadgeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {

    const userId = "me";
    const followedById = "notme";
    const followsResponse: FollowsResponseModel = {
      userId: userId,
      followedById: followedById
    };

    let apiResponse: FollowsResponseModel|undefined;

    authService.userSubject.next({ profile: { sub: userId }} as User);
    service.findFollower.withArgs("", "", followedById).and.returnValue(of(followsResponse));

    component.userId = followedById;
    fixture.detectChanges();

    expect(component).toBeTruthy();
    
  });
});
