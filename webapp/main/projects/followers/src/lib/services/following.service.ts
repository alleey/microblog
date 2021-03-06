import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { OidcAuthService, Profile } from 'auth-oidc';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Pageable } from 'utils';
import { FollowingServiceConfig, FollowingServiceConfigToken } from '../config/config';
import { FollowsListResponseModel, FollowsModel, FollowsResponseModel } from '../models/follows';

export interface FollowingServiceChangeNotification {
  userId: string;
  followedById?: string;
}

@Injectable({
  providedIn: 'root'
})
export class FollowingService {

  public onChange = new Subject<FollowingServiceChangeNotification>();
  private userProfile?: Profile;

  constructor(
    @Inject(FollowingServiceConfigToken) 
    private config: FollowingServiceConfig,
    private authService: OidcAuthService,
    private httpClient: HttpClient) 
  { 
    this.authService.userSubject.subscribe(user => {
      this.userProfile = user?.profile;
    });
  }

  public findFollower(endpoint: string, userId: string, followedById: string): Observable<FollowsResponseModel> {
    const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
    const owner = !!userId ? userId : this.userProfile?.sub;

    if(!owner) 
      return throwError(new Error("Cannot determine userid"));
    return this.httpClient
            .get<FollowsResponseModel>(`${this.config.serviceBaseUrl}/${apiEndpoint}/${owner}/followers/${followedById}`);
  }

  public findFollowing(endpoint: string, userId: string, followedById: string): Observable<FollowsResponseModel> {
    const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
    const owner = !!userId ? userId : this.userProfile?.sub;

    if(!owner) 
      return throwError(new Error("Cannot determine userid"));
    return this.httpClient
            .get<FollowsResponseModel>(`${this.config.serviceBaseUrl}/${apiEndpoint}/${owner}/following/${followedById}`);
  }

  public followers(endpoint: string, userId: string, pageable?: Pageable): Observable<FollowsListResponseModel> {

    const page: number = pageable ? pageable.page : 0;
    const pageSize: number = (pageable && pageable.limit) ? pageable.limit : this.config.pageSize;
    const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
    const owner = !!userId ? userId : this.userProfile?.sub;

    if(!owner) 
      return throwError(new Error("Cannot determine userid"));
    return this.httpClient
            .get<FollowsListResponseModel>(`${this.config.serviceBaseUrl}/${apiEndpoint}/${owner}/followers`, {
              params: {
                "page": page.toString(),
                "size": pageSize.toString(),
                "sort": "createdOn,asc"
              }
            });
  }

  public following(endpoint: string, userId: string, pageable?: Pageable): Observable<FollowsListResponseModel> {

    const page: number = pageable ? pageable.page : 0;
    const pageSize: number = (pageable && pageable.limit) ? pageable.limit : this.config.pageSize;
    const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
    const owner = !!userId ? userId : this.userProfile?.sub;

    if(!owner) 
      return throwError(new Error("Cannot determine userid"));
    return this.httpClient
            .get<FollowsListResponseModel>(`${this.config.serviceBaseUrl}/${apiEndpoint}/${owner}/following`, {
              params: {
                "page": page.toString(),
                "size": pageSize.toString(),
                "sort": "createdOn,asc"
              }
            });
  }

  public follow(endpoint: string, userId: string, userTofollow: string): Observable<FollowsResponseModel> {

    const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
    const owner = !!userId ? userId : this.userProfile?.sub;

    if(!owner) 
      return throwError(new Error("Cannot determine userid"));
    return this.httpClient
            .post<FollowsResponseModel>(`${this.config.serviceBaseUrl}/${apiEndpoint}/${owner}/following`, {
              "followedId": userTofollow
            })
            .pipe(
              tap({
                next: x => { this.onChange.next({userId: userTofollow, followedById: owner}); }
              })
            );
  }

  public unfollow(endpoint: string, userId: string, userToUnfollow: string): Observable<void> {

    const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
    const owner = !!userId ? userId : this.userProfile?.sub;

    if(!owner) 
      return throwError(new Error("Cannot determine userid"));
    return this.httpClient
            .delete<void>(`${this.config.serviceBaseUrl}/${apiEndpoint}/${owner}/following/${userToUnfollow}`)
            .pipe(
              tap({
                next: x => { this.onChange.next({userId: userToUnfollow, followedById: owner}); }
              })
            );
  }
}
