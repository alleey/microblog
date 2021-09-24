import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { By } from '@angular/platform-browser';

import { FollowingService } from '../../services/following.service';
import { FollowersListComponent } from './follower-list.component';
import { FollowsModel, FollowsListResponseModel } from '../../models/follows';
import { FollowersListViewComponent } from '../follower-list-view/follower-list-view.component';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject } from 'rxjs';

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
      declarations: [ FollowersListComponent, FollowersListViewComponent ],
      imports: [RouterTestingModule],
      providers: [
        { provide: FollowingService, useValue: service },
      ]
    })
    .compileComponents();

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
    component.gotoPage(2);
    fixture.detectChanges();

    expect(service.followers).toHaveBeenCalled();
  });

  it('should fire onSelect when clicked', fakeAsync(() => {

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
