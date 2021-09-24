import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, Subject } from 'rxjs';

import { FollowingService } from '../../services/following.service';
import { FollowerBadgeComponent } from './follower-badge.component';
import { FollowsResponseModel } from '../../models/follows';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('FollowerBadgeComponent', () => {
  let component: FollowerBadgeComponent;
  let fixture: ComponentFixture<FollowerBadgeComponent>;
  let service: jasmine.SpyObj<FollowingService>;
  let route: ActivatedRoute;

  beforeEach(async () => {

    service = jasmine.createSpyObj<FollowingService>('FollowingService', 
      ['findFollower'], {
        onChange: new Subject()
      }
    );

    await TestBed.configureTestingModule({
      declarations: [ FollowerBadgeComponent ],
      imports: [RouterTestingModule],
      providers: [
        { provide: FollowingService, useValue: service },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FollowerBadgeComponent);
    component = fixture.componentInstance;
    route = TestBed.inject(ActivatedRoute);
  });

  it('should create', () => {

    const userId = "me";
    const followedById = "notme";
    const followsResponse: FollowsResponseModel = {
      userId: userId,
      followedById: followedById
    };

    service.findFollower.withArgs("", "", followedById).and.returnValue(of(followsResponse));
    component.paramUserId = followedById;
    fixture.detectChanges();

    expect(component).toBeTruthy();
    expect(component.isActive).toBeTrue();
  });

  it('should refresh when service onChange is triggered', () => {

    const userId = "me";
    const followedById = "notme";
    const followsResponse: FollowsResponseModel = {
      userId: userId,
      followedById: followedById
    };
  
    service.findFollower.withArgs("", "", followedById).and.returnValue(of(followsResponse));
    component.paramUserId = followedById;
    fixture.detectChanges();

    service.onChange.next({});
    fixture.detectChanges();

    expect(service.findFollower).toHaveBeenCalledTimes(2);
  });
  
});
