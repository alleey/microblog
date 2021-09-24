import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { of, Subject, throwError } from 'rxjs';

import { FollowingService } from '../../services/following.service';
import { FollowingBadgeComponent } from './following-badge.component';
import { FollowsResponseModel } from '../../models/follows';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('FollowingBadgeComponent', () => {
  let component: FollowingBadgeComponent;
  let fixture: ComponentFixture<FollowingBadgeComponent>;
  let service: jasmine.SpyObj<FollowingService>;
  let route: ActivatedRoute;

  beforeEach(async () => {

    service = jasmine.createSpyObj<FollowingService>('FollowingService', 
      ['findFollowing', 'follow', 'unfollow'], {
        onChange: new Subject()
      }
    );

    await TestBed.configureTestingModule({
      declarations: [ FollowingBadgeComponent ],
      imports: [RouterTestingModule],
      providers: [
        { provide: FollowingService, useValue: service },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FollowingBadgeComponent);
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

    service.findFollowing.withArgs("", "", followedById).and.returnValue(of(followsResponse));

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

    service.findFollowing.withArgs("", "", followedById).and.returnValue(of(followsResponse));
    component.paramUserId = followedById;
    fixture.detectChanges();

    service.onChange.next({});
    fixture.detectChanges();

    expect(service.findFollowing).toHaveBeenCalledTimes(2);
  });

  it('should call follow when clicked and user is not following', fakeAsync(() => {

    const { debugElement } = fixture;

    const userId = "me";
    const userTofollow = "notme";
    const followsResponse: FollowsResponseModel = {
      userId: userTofollow,
      followedById: userId
    };

    service.findFollowing.withArgs("", "", userTofollow).and.returnValue(throwError(new Error()));
    service.follow.withArgs("", "", userTofollow).and.returnValue(of(followsResponse));

    component.paramUserId = userTofollow;
    fixture.detectChanges();
    expect(component.isActive).toBeFalse();

    component.follow();
    tick();
    fixture.detectChanges();

    expect(service.follow).toHaveBeenCalled();
    expect(component.isActive).toBeTrue();
  }));

  it('should call unfollow when clicked and user is following', fakeAsync(() => {

    const { debugElement } = fixture;

    const userId = "me";
    const userToUnfollow = "notme";
    const followsResponse: FollowsResponseModel = {
      userId: userToUnfollow,
      followedById: userId
    };

    service.findFollowing.withArgs("", "", userToUnfollow).and.returnValue(of(followsResponse));
    service.unfollow.withArgs("", "", userToUnfollow).and.returnValue(of(undefined));

    component.paramUserId = userToUnfollow;
    fixture.detectChanges();
    expect(component.isActive).toBeTrue();

    component.unfollow();
    tick();
    fixture.detectChanges();

    expect(service.unfollow).toHaveBeenCalled();
    expect(component.isActive).toBeFalse();
  }));

});

