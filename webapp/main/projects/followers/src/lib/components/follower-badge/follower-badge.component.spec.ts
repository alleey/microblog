import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent } from 'ng-mocks';
import { of, Subject, throwError } from 'rxjs';
import { BadgeComponent } from 'utils';
import { FollowsResponseModel } from '../../models/follows';
import { FollowingService } from '../../services/following.service';
import { FollowerBadgeComponent } from './follower-badge.component';


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
      declarations: [
        FollowerBadgeComponent,
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
    fixture = TestBed.createComponent(FollowerBadgeComponent);
    component = fixture.componentInstance;
    route = TestBed.inject(ActivatedRoute);
  });

  it('should render active when follower is found', () => {

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

  it('should render inactive when follower is NOT found', () => {

    const { debugElement } = fixture;

    const userId = "me";
    const followedById = "notme";

    service.findFollower.and.returnValue(throwError(new Error()));
    component.paramUserId = followedById;
    fixture.detectChanges();

    expect(component).toBeTruthy();
    expect(component.isActive).toBeFalse();
  });

  it('should take userid from path', () => {

    const userId = "me";
    const followedById = "notme";
    const followsResponse: FollowsResponseModel = {
      userId: userId,
      followedById: followedById
    };

    service.findFollower.withArgs("", "", followedById).and.returnValue(of(followsResponse));

    component.paramUserId = "thisshouldnotbeused";
    spyOnProperty(route, "paramMap").and.returnValue(
      of(convertToParamMap({ userId: followedById }))
    );
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
