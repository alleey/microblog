import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { OidcAuthService, User } from 'auth-oidc';
import { BehaviorSubject } from 'rxjs';
import { FollowingServiceConfigToken } from '../config/config';
import { FollowsListResponseModel, FollowsResponseModel } from '../models/follows';

import { FollowingService } from './following.service';

describe('FollowingService', () => {
  let controller: HttpTestingController;
  let service: FollowingService;
  let authService: jasmine.SpyObj<OidcAuthService>;

  beforeEach(() => {
    authService = jasmine.createSpyObj<OidcAuthService>('OidcAuthService', 
      [], {
        userSubject: new BehaviorSubject<any>(undefined)
      }
    );

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: 
      [
        FollowingService, 
        {
          provide: FollowingServiceConfigToken,
          useValue: { serviceBaseUrl: "http://localhost", defaultEndpoint: "users", pageSize: 10 }
        },
        { provide: OidcAuthService, useValue: authService }
      ]
    });

    controller = TestBed.inject(HttpTestingController);
    service = TestBed.inject(FollowingService);
  });

  it('returns follower record of logged in user', () => {

    const userId = "me";
    const followerId = "notme";
    const followsResponse: FollowsResponseModel = {
      userId: userId,
      followedById: followerId
    };

    let apiResponse: FollowsResponseModel|undefined;

    authService.userSubject.next({ profile: { sub: userId }} as User);
    service.findFollower("", "", followerId).subscribe({
      next: (res: FollowsResponseModel) => {
        apiResponse = res;
      }
    });

    controller.expectOne(`http://localhost/users/${userId}/followers/${followerId}`).flush(followsResponse);
    controller.verify();

    expect(apiResponse).toEqual(followsResponse);
  });

  it('returns following record of logged in user', () => {

    const userId = "me";
    const followerById = "notme";
    const followsResponse: FollowsResponseModel = {
      userId: userId,
      followedById: followerById
    };

    let apiResponse: FollowsResponseModel|undefined;

    authService.userSubject.next({ profile: { sub: userId }} as User);
    service.findFollowing("", "", followerById).subscribe({
      next: (res: FollowsResponseModel) => {
        apiResponse = res;
      }
    });

    controller.expectOne(`http://localhost/users/${userId}/following/${followerById}`).flush(followsResponse);
    controller.verify();

    expect(apiResponse).toEqual(followsResponse);
  });

  it('returns followers of logged in user with default paging', () => {

    const userId = "me";
    const followedById = "notme";

    const followerListResponse: FollowsListResponseModel = {
      _embedded: {
        follows: [
          { userId: userId, followedById: followedById }
        ]
      },
      page: { number: 0, size: 1, totalElements:1, totalPages: 1 }
    };

    let apiResponse: FollowsListResponseModel|undefined;

    authService.userSubject.next({ profile: { sub: userId }} as User);
    service.followers("", "").subscribe({
      next: (res: FollowsListResponseModel) => {
        apiResponse = res;
      }
    });

    controller.expectOne(`http://localhost/users/${userId}/followers?page=0&size=10&sort=createdOn,asc`)
      .flush(followerListResponse);
    controller.verify();

    expect(apiResponse).toEqual(followerListResponse);
  });

  it('returns following of logged in user with default paging', () => {

    const userId = "me";
    const followerById = "notme";
    const pageable = {
      page: 0
    };

    const followerListResponse: FollowsListResponseModel = {
      _embedded: {
        follows: [
          { userId: userId, followedById: followerById }
        ]
      },
      page: { number: 0, size: 1, totalElements:1, totalPages: 1 }
    };

    let apiResponse: FollowsListResponseModel|undefined;

    authService.userSubject.next({ profile: { sub: userId }} as User);
    service.following("", "").subscribe({
      next: (res: FollowsListResponseModel) => {
        apiResponse = res;
      }
    });

    controller.expectOne(`http://localhost/users/${userId}/following?page=0&size=10&sort=createdOn,asc`)
      .flush(followerListResponse);
    controller.verify();

    expect(apiResponse).toEqual(followerListResponse);
  });

  it('logged in user is set to follow given user', () => {

    const userId = "me";
    const userToFollow = "notme";
    const followsResponse: FollowsResponseModel = {
      userId: userToFollow,
      followedById: userId
    };

    let apiResponse: FollowsResponseModel|undefined;

    authService.userSubject.next({ profile: { sub: userId }} as User);
    service.follow("", "", userToFollow).subscribe({
      next: (res: FollowsResponseModel) => {
        apiResponse = res;
      }
    });

    controller
      .expectOne({ method: 'POST', url: `http://localhost/users/${userId}/following`})
      .flush(followsResponse);
    controller.verify();

    expect(apiResponse).toEqual(followsResponse);
  });

  it('logged in user is set to unfollow given user', () => {

    const userId = "me";
    const userToUnfollow = "notme";

    let apiResponse = false;

    authService.userSubject.next({ profile: { sub: userId }} as User);
    service.unfollow("", "", userToUnfollow).subscribe({
      next: () => {
        apiResponse = true;
      }
    });

    controller
      .expectOne({ method: 'DELETE', url: `http://localhost/users/${userId}/following/${userToUnfollow}`})
      .flush({});
    controller.verify();

    expect(apiResponse).toEqual(true);
  });

});
