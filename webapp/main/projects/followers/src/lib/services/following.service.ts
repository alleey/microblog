import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { OidcAuthService } from 'auth-oidc';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Pageable } from 'utils';
import { FollowingServiceConfig, FollowingServiceConfigToken } from '../config/config';
import { FollowedByListResponseModel, FollowedByResponseModel } from '../models/followed-by';
import { FollowingListResponseModel } from '../models/following';

export interface FollowRequest {
  userId: string;
  userName: string;
  followedById: string;
  followedByName: string;
};

@Injectable({
  providedIn: 'root'
})
export class FollowingService {

  public onChange: Subject<any> = new Subject<any>();
  private userProfile: any;

  constructor(
    @Inject(FollowingServiceConfigToken) 
    private config: FollowingServiceConfig,
    private authService: OidcAuthService,
    private httpClient: HttpClient) 
  { 
    this.authService.userSubject.subscribe(profile => {
      this.userProfile = profile;
    });
  }

  public followedByOne(endpoint: string, userId: string, followedById: string): Observable<FollowedByResponseModel> {
    const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
    const owner = !!userId ? userId : this.userProfile?.sub;

    console.info("followed-by : " + followedById);

    return this.httpClient
            .get<FollowedByResponseModel>(`${this.config.serviceBaseUrl}/${apiEndpoint}/${owner}/followedBy/${followedById}`)
            .pipe(
              map(data => {
                return data as FollowedByResponseModel;
              })
            );
  }

  public followedBy(endpoint: string, userId: string, pageable?: Pageable): Observable<FollowedByListResponseModel> {

    const page: number = pageable ? pageable.page : 0;
    const pageSize: number = (pageable && pageable.limit) ? pageable.limit : this.config.pageSize;
    const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
    const owner = !!userId ? userId : this.userProfile?.sub;

    return this.httpClient
            .get<FollowedByListResponseModel>(`${this.config.serviceBaseUrl}/${apiEndpoint}/${owner}/followedBy`, {
              params: {
                "page": page.toString(),
                "size": pageSize.toString(),
                "sort": "followedByName,asc"
              }
            })
            .pipe(
              map(data => {
                return data as FollowedByListResponseModel;
              })
            );
  }

  public findFollowedByMatching(endpoint: string, userId: string, name: string, pageable?: Pageable): Observable<FollowedByListResponseModel> {

    const page: number = pageable ? pageable.page : 0;
    const pageSize: number = (pageable && pageable.limit) ? pageable.limit : this.config.pageSize;
    const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
    const owner = !!userId ? userId : this.userProfile?.sub;

    const query = {
      "conditions": [
        { "attribute": "followedByName.fullName", "operator": "like", "value": `%${name}%` }
      ]
    };
    return this.httpClient
            .get<FollowedByListResponseModel>(`${this.config.serviceBaseUrl}/${apiEndpoint}/${owner}/followedBy/search`, 
            {
              "params": { 
                "q": JSON.stringify(query),
                "page": page.toString(),
                "size": pageSize.toString(),
                "sort": "followedByName,asc"
              }
            })
            .pipe(
              map(data => {
                return data as FollowedByListResponseModel;
              })
            );
  }

  public followingOne(endpoint: string, userId: string, followedById: string): Observable<FollowedByResponseModel> {
    const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
    const owner = !!userId ? userId : this.userProfile?.sub;

    return this.httpClient
            .get<FollowedByResponseModel>(`${this.config.serviceBaseUrl}/${apiEndpoint}/${owner}/following/${followedById}`)
            .pipe(
              map(data => {
                return data as FollowedByResponseModel;
              })
            );
  }

  public following(endpoint: string, userId: string, pageable?: Pageable): Observable<FollowingListResponseModel> {

    const page: number = pageable ? pageable.page : 0;
    const pageSize: number = (pageable && pageable.limit) ? pageable.limit : this.config.pageSize;
    const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
    const owner = !!userId ? userId : this.userProfile?.sub;

    return this.httpClient
            .get<FollowingListResponseModel>(`${this.config.serviceBaseUrl}/${apiEndpoint}/${owner}/following`, {
              params: {
                "page": page.toString(),
                "size": pageSize.toString(),
                "sort": "userName,asc"
              }
            })
            .pipe(
              map(data => {
                return data as FollowingListResponseModel;
              })
            );
  }

  public findFollowingMatching(endpoint: string, userId: string, name: string, pageable?: Pageable): Observable<FollowingListResponseModel> {

    const page: number = pageable ? pageable.page : 0;
    const pageSize: number = (pageable && pageable.limit) ? pageable.limit : this.config.pageSize;
    const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
    const owner = !!userId ? userId : this.userProfile?.sub;

    const query = {
      "conditions": [
        { "attribute": "userName.fullName", "operator": "like", "value": `%${name}%` }
      ]
    };
    return this.httpClient
            .get<FollowingListResponseModel>(`${this.config.serviceBaseUrl}/${apiEndpoint}/${owner}/following/search`, 
            {
              "params": { 
                "q": JSON.stringify(query),
                "page": page.toString(),
                "size": pageSize.toString(),
                "sort": "userName,asc"
              }
            })
            .pipe(
              map(data => {
                return data as FollowingListResponseModel;
              })
            );
  }

  public follow(endpoint: string, followReq: FollowRequest): Observable<void> {

    const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;

    followReq.followedById = !!followReq.followedById ? followReq.followedById : this.userProfile?.sub;
    followReq.followedByName = !!followReq.followedByName ? followReq.followedByName : this.userProfile?.name;
    const owner = followReq.followedById;

    return this.httpClient
            .put<void>(`${this.config.serviceBaseUrl}/${apiEndpoint}/${owner}/following`, followReq)
            .pipe(
              catchError((error: any) => {
                return throwError(new Error(error.status));
              }),
              tap({
                next: x => { this.onChange.next(x); }
              })
            );
  }

  public unfollow(endpoint: string, userId: string, userToUnfollow: string): Observable<void> {

    const apiEndpoint = endpoint ? endpoint : this.config.defaultEndpoint;
    const owner = !!userId ? userId : this.userProfile?.sub;

    return this.httpClient
            .delete<void>(`${this.config.serviceBaseUrl}/${apiEndpoint}/${owner}/following/${userToUnfollow}`)
            .pipe(
              catchError((error: any) => {
                return throwError(new Error(error.status));
              }),
              tap({
                next: x => { this.onChange.next(x); }
              })
            );
  }
}
