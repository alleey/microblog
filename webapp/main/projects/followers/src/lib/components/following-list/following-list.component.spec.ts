import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { By } from '@angular/platform-browser';
import { FollowingService } from '../../services/following.service';

import { FollowingListComponent } from './following-list.component';
import { FollowsModel, FollowsListResponseModel } from '../../models/follows';
import { FollowingListViewComponent } from '../following-list-view/following-list-view.component';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, throwError } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('FollowingListComponent', () => {
  let component: FollowingListComponent;
  let fixture: ComponentFixture<FollowingListComponent>;
  let service: jasmine.SpyObj<FollowingService>;
  let route: ActivatedRoute;

  beforeEach(async () => {

    service = jasmine.createSpyObj<FollowingService>('FollowingService',
      ['following'], {
        onChange: new Subject()
      }
    );

    await TestBed.configureTestingModule({
      declarations: [ FollowingListComponent, FollowingListViewComponent ],
      imports: [RouterTestingModule],
      providers: [
        { provide: FollowingService, useValue: service },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowingListComponent);
    component = fixture.componentInstance;
    route = TestBed.inject(ActivatedRoute);
  });

  it('should render following list when found', fakeAsync(() => {

    const userId = "me";
    const followedById = "notme";
    const pageable = {
      page: 0
    };

    const followerListResponse: FollowsListResponseModel = {
      _embedded: {
        follows: [ { userId: userId, followedById: followedById } ]
      },
      page: { number: 0, size: 1, totalElements:1, totalPages: 1 }
    };

    service.following.withArgs("", "", pageable).and.returnValue(of(followerListResponse));
    tick();
    fixture.detectChanges();

    expect(component).toBeTruthy();
    expect(component.hasItems).toBeTrue();
    expect(component.items).toEqual(followerListResponse._embedded.follows);
  }));

  it('should NOT render followers list when NOT found', () => {

    const pageable = { page: 0 };
    service.following.withArgs("", "", pageable).and.returnValue(throwError(new Error()));

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

    service.following.withArgs("", "", pageable).and.returnValue(of(followerListResponse));
    fixture.detectChanges();

    service.onChange.next({});
    fixture.detectChanges();

    expect(service.following).toHaveBeenCalledTimes(2);
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
    service.following.withArgs("", "", pageable).and.returnValue(of(followerListResponse));

    fixture.detectChanges();
    expect(service.following).toHaveBeenCalled();
    expect(component.page?.number).toEqual(1);
  });

  it('should go to page number selected by pager', () => {

    const userId = "me";
    const followedById = "notme";

    const followerListResponse: FollowsListResponseModel = {
      _embedded: {
        follows: [ { userId: userId, followedById: followedById } ]
      },
      page: { number: 1, size: 1, totalElements:1, totalPages: 1 }
    };

    service.following.withArgs("", "", { page: 0 }).and.returnValue(of(followerListResponse));
    fixture.detectChanges();

    service.following.withArgs("", "", { page: 1 }).and.returnValue(of(followerListResponse));
    component.gotoPage(2);
    fixture.detectChanges();

    expect(service.following).toHaveBeenCalled();
  });

  it('should fire onSelect when clicked', fakeAsync(() => {

    const userId = "me";
    const followedById = "notme";
    const pageable = {
      page: 0
    };

    const followerListResponse: FollowsListResponseModel = {
      _embedded: {
        follows: [ { userId: userId, followedById: followedById } ]
      },
      page: { number: 0, size: 1, totalElements:1, totalPages: 1 }
    };

    service.following.withArgs("", "", pageable).and.returnValue(of(followerListResponse));
    fixture.detectChanges();

    const { debugElement } = fixture;
    const view = debugElement.query(By.directive(FollowingListViewComponent)).componentInstance;

    let firedEvent: FollowsModel|undefined = undefined;
    component.onSelect = (evt: FollowsModel) => {
      firedEvent = evt;
    };
    view.onSelectItem.emit({ opcode: 'select', item: followerListResponse._embedded.follows[0] });
    tick();
    fixture.detectChanges();

    expect(firedEvent).toBeTruthy();
    expect(firedEvent!).toEqual(followerListResponse._embedded.follows[0]);
  }));

});
