import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent } from 'ng-mocks';
import { of, Subject, throwError } from 'rxjs';
import { BadgeComponent } from 'utils';
import { FollowsResponseModel } from '../../models/follows';
import { FollowingService } from '../../services/following.service';
import { FollowingBadgeComponent } from './following-badge.component';


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
      declarations: [
        FollowingBadgeComponent,
        MockComponent(BadgeComponent)
      ],
      imports: [RouterTestingModule],
      providers: [
        { provide: FollowingService, useValue: service },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowingBadgeComponent);
    component = fixture.componentInstance;
    route = TestBed.inject(ActivatedRoute);
  });

  it('should render active when following is found', () => {

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

  it('should render inactive when following is NOT found', () => {

    const { debugElement } = fixture;

    const userId = "me";
    const followedById = "notme";

    service.findFollowing.and.returnValue(throwError(new Error()));
    component.paramUserId = followedById;
    fixture.detectChanges();

    expect(component).toBeTruthy();
    expect(component.isActive).toBeFalse();
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

  it('should take userid from path', () => {

    const userId = "me";
    const followedById = "notme";
    const followsResponse: FollowsResponseModel = {
      userId: userId,
      followedById: followedById
    };

    service.findFollowing.withArgs("", "", followedById).and.returnValue(of(followsResponse));

    component.paramUserId = "thisshouldnotbeused";
    spyOnProperty(route, "paramMap").and.returnValue(
      of(convertToParamMap({ userId: followedById }))
    );
    fixture.detectChanges();

    expect(component).toBeTruthy();
    expect(component.isActive).toBeTrue();
  });

  it('should follow when clicked and user is not following', () => {

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

    const badge = debugElement.query(By.css('utils-badge')).componentInstance;
    badge.onAdd.emit();
    fixture.detectChanges();

    expect(service.follow).toHaveBeenCalled();
    expect(component.isActive).toBeTrue();
  });

  it('should unfollow when clicked and user is following', () => {

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

    const badge = debugElement.query(By.css('utils-badge')).componentInstance;
    badge.onRemove.emit();
    fixture.detectChanges();

    expect(service.unfollow).toHaveBeenCalled();
    expect(component.isActive).toBeFalse();
  });

});

