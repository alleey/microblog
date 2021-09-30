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

    authService.userSubject.next({ profile: { sub: userId }} as User);
    let apiResponse: FollowsResponseModel|undefined;
    service.findFollower("", "", followerId).subscribe({
      next: (res: FollowsResponseModel) => {
        apiResponse = res;
      }
    });

    controller.expectOne(`http://localhost/users/${userId}/followers/${followerId}`).flush(followsResponse);
    controller.verify();

    expect(apiResponse).toEqual(followsResponse);
  });

  it('findFollower returns error if no user is logged in and no user is provided', () => {

    const followerId = "notme";

    let apiResponse: Error|undefined;
    service.findFollower("", "", followerId).subscribe({
      error: (res: Error) => {
        apiResponse = res;
      }
    });

    expect(apiResponse).toBeTruthy();
  });

  it('returns following record of logged in user', () => {

    const userId = "me";
    const followedById = "notme";
    const followsResponse: FollowsResponseModel = {
      userId: userId,
      followedById: followedById
    };

    authService.userSubject.next({ profile: { sub: userId }} as User);
    let apiResponse: FollowsResponseModel|undefined;
    service.findFollowing("", "", followedById).subscribe({
      next: (res: FollowsResponseModel) => {
        apiResponse = res;
      }
    });

    controller.expectOne(`http://localhost/users/${userId}/following/${followedById}`).flush(followsResponse);
    controller.verify();

    expect(apiResponse).toEqual(followsResponse);
  });

  it('findFollowing returns error if no user is logged in and no user is provided', () => {

    const followedById = "notme";

    let apiResponse: Error|undefined;
    service.findFollowing("", "", followedById).subscribe({
      error: (res: Error) => {
        apiResponse = res;
      }
    });

    expect(apiResponse).toBeTruthy();
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

    authService.userSubject.next({ profile: { sub: userId }} as User);
    let apiResponse: FollowsListResponseModel|undefined;
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

  it('returns followers of logged in user with custom paging', () => {

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
    const pageable = { page: 10, limit: 100 };

    authService.userSubject.next({ profile: { sub: userId }} as User);
    let apiResponse: FollowsListResponseModel|undefined;
    service.followers("", "", pageable).subscribe({
      next: (res: FollowsListResponseModel) => {
        apiResponse = res;
      }
    });

    controller.expectOne(`http://localhost/users/${userId}/followers?page=${pageable.page}&size=${pageable.limit}&sort=createdOn,asc`)
      .flush(followerListResponse);
    controller.verify();

    expect(apiResponse).toEqual(followerListResponse);
  });

  it('followers returns error if no user is logged in and no user is provided', () => {

    let apiResponse: Error|undefined;
    service.followers("", "").subscribe({
      error: (res: Error) => {
        apiResponse = res;
      }
    });

    expect(apiResponse).toBeTruthy();
  });

  it('returns following of logged in user with default paging', () => {

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

    authService.userSubject.next({ profile: { sub: userId }} as User);
    let apiResponse: FollowsListResponseModel|undefined;
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

  it('returns following of logged in user with custom paging', () => {

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
    const pageable = { page: 10, limit: 100 };

    authService.userSubject.next({ profile: { sub: userId }} as User);
    let apiResponse: FollowsListResponseModel|undefined;
    service.following("", "", pageable).subscribe({
      next: (res: FollowsListResponseModel) => {
        apiResponse = res;
      }
    });

    controller.expectOne(`http://localhost/users/${userId}/following?page=${pageable.page}&size=${pageable.limit}&sort=createdOn,asc`)
      .flush(followerListResponse);
    controller.verify();

    expect(apiResponse).toEqual(followerListResponse);
  });

  it('following returns error if no user is logged in and no user is provided', () => {

    let apiResponse: Error|undefined;
    service.following("", "").subscribe({
      error: (res: Error) => {
        apiResponse = res;
      }
    });

    expect(apiResponse).toBeTruthy();
  });

  it('logged in user is set to follow given user', () => {

    const userId = "me";
    const userToFollow = "notme";
    const followsResponse: FollowsResponseModel = {
      userId: userToFollow,
      followedById: userId
    };

    authService.userSubject.next({ profile: { sub: userId } } as User);
    let apiResponse: FollowsResponseModel|undefined;
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

  it('follow returns error if no user is logged in and no user is provided', () => {

    const userToFollow = "notme";

    let apiResponse: Error|undefined;
    service.follow("", "", userToFollow).subscribe({
      error: (res: Error) => {
        apiResponse = res;
      }
    });

    expect(apiResponse).toBeTruthy();
  });

  it('logged in user is set to unfollow given user', () => {

    const userId = "me";
    const userToUnfollow = "notme";

    authService.userSubject.next({ profile: { sub: userId }} as User);
    let apiResponse = false;
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

  it('unfollow returns error if no user is logged in and no user is provided', () => {

    const userToUnfollow = "notme";

    let apiResponse: Error|undefined;
    service.unfollow("", "", userToUnfollow).subscribe({
      error: (res: Error) => {
        apiResponse = res;
      }
    });

    expect(apiResponse).toBeTruthy();
  });

});
