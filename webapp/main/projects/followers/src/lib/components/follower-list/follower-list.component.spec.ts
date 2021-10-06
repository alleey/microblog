import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent } from 'ng-mocks';
import { of, Subject, throwError } from 'rxjs';
import { PagerComponent } from 'utils';
import { FollowsListResponseModel } from '../../models/follows';
import { FollowingService } from '../../services/following.service';
import { FollowersListViewComponent } from '../follower-list-view/follower-list-view.component';
import { FollowerListEvent, FollowersListComponent } from './follower-list.component';

describe('FollowersListComponent', () => {
  let component: FollowersListComponent;
  let fixture: ComponentFixture<FollowersListComponent>;
  let service: jasmine.SpyObj<FollowingService>;
  let route: ActivatedRoute;

  beforeEach(async () => {

    service = jasmine.createSpyObj<FollowingService>('FollowingService',
      ['followers'], {
        onChange: new Subject()
      }
    );

    await TestBed.configureTestingModule({
      declarations: [
        FollowersListComponent,
        MockComponent(FollowersListViewComponent),
        MockComponent(PagerComponent)
      ],
      imports: [RouterTestingModule],
      providers: [
        { provide: FollowingService, useValue: service },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowersListComponent);
    component = fixture.componentInstance;
    route = TestBed.inject(ActivatedRoute);
  });

  it('should render followers list when found', () => {

    const userId = "me";
    const followedById = "notme";
    const pageable = { page: 0 };

    const followerListResponse: FollowsListResponseModel = {
      _embedded: {
        follows: [ { userId: userId, followedById: followedById } ]
      },
      page: { number: 0, size: 1, totalElements:1, totalPages: 1 }
    };

    service.followers.withArgs("", "", pageable).and.returnValue(of(followerListResponse));

    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(component.hasItems).toBeTrue();
    expect(component.page?.number).toEqual(0);
    expect(component.items).toEqual(followerListResponse._embedded.follows);
  });

  it('should NOT render followers list when NOT found', () => {

    const pageable = { page: 0 };
    service.followers.withArgs("", "", pageable).and.returnValue(throwError(new Error()));

    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(component.hasItems).toBeFalse();
    expect(component.page?.number).toBeFalsy();
    expect(component.items).toBeFalsy();
  });

  it('should refresh when service onChange is triggered', () => {

    const userId = "me";
    const followedById = "notme";
    const pageable = { page: 0 };

    const followerListResponse: FollowsListResponseModel = {
      _embedded: {
        follows: [ { userId: userId, followedById: followedById } ]
      },
      page: { number: 0, size: 1, totalElements:1, totalPages: 1 }
    };

    service.followers.withArgs("", "", pageable).and.returnValue(of(followerListResponse));
    fixture.detectChanges();

    service.onChange.next({});
    fixture.detectChanges();

    expect(service.followers).toHaveBeenCalledTimes(2);
  });

  it('should go to page number passed as parameter', () => {

    const userId = "me";
    const followedById = "notme";

    const pageable = { page: 1 };
    const followerListResponse: FollowsListResponseModel = {
      _embedded: {
        follows: [ { userId: userId, followedById: followedById } ]
      },
      page: { number: 1, size: 1, totalElements:1, totalPages: 1 }
    };

    spyOnProperty(route, "paramMap").and.returnValue(
      of(convertToParamMap({ pageNum: 1 }))
    );
    service.followers.withArgs("", "", pageable).and.returnValue(of(followerListResponse));

    fixture.detectChanges();
    expect(service.followers).toHaveBeenCalled();
    expect(component.page?.number).toEqual(1);
  });

  it('should go to page number selected by pager', () => {

    const { debugElement } = fixture;

    const userId = "me";
    const followedById = "notme";

    const followerListResponse: FollowsListResponseModel = {
      _embedded: {
        follows: [ { userId: userId, followedById: followedById } ]
      },
      page: { number: 1, size: 1, totalElements:1, totalPages: 1 }
    };

    service.followers.withArgs("", "", { page: 0 }).and.returnValue(of(followerListResponse));
    fixture.detectChanges();

    service.followers.withArgs("", "", { page: 1 }).and.returnValue(of(followerListResponse));
    const pager = debugElement.query(By.directive(PagerComponent)).componentInstance;
    pager.onSelectPage.emit(2);
    fixture.detectChanges();

    expect(service.followers).toHaveBeenCalled();
  });

  it('should fire onEvent when clicked', () => {

    const userId = "me";
    const followedById = "notme";
    const pageable = { page: 0 };

    const followerListResponse: FollowsListResponseModel = {
      _embedded: {
        follows: [ { userId: userId, followedById: followedById } ]
      },
      page: { number: 0, size: 1, totalElements:1, totalPages: 1 }
    };

    service.followers.withArgs("", "", pageable).and.returnValue(of(followerListResponse));
    fixture.detectChanges();

    const { debugElement } = fixture;
    const view = debugElement.query(By.directive(FollowersListViewComponent)).componentInstance;

    let firedEvent: FollowerListEvent|undefined = undefined;
    component.onEvent.subscribe((evt: FollowerListEvent) => {
      firedEvent = evt;
    });
    view.onEvent.emit({ opcode: 'select', item: followerListResponse._embedded.follows[0] });
    fixture.detectChanges();

    expect(firedEvent).toBeTruthy();
    expect(firedEvent!.item).toEqual(followerListResponse._embedded.follows[0]);
  });

});
