import { HttpClient } from '@angular/common/http';
import { OidcAuthService } from 'auth-oidc';
import { Observable, Subject } from 'rxjs';
import { Pageable } from 'utils';
import { FollowingServiceConfig } from '../config/config';
import { FollowedByListResponseModel, FollowedByResponseModel } from '../models/followed-by';
import { FollowingListResponseModel } from '../models/following';
import * as i0 from "@angular/core";
export interface FollowRequest {
    userId: string;
    userName: string;
    followedById: string;
    followedByName: string;
}
export declare class FollowingService {
    private config;
    private authService;
    private httpClient;
    onChange: Subject<any>;
    private userProfile;
    constructor(config: FollowingServiceConfig, authService: OidcAuthService, httpClient: HttpClient);
    followedByOne(endpoint: string, userId: string, followedById: string): Observable<FollowedByResponseModel>;
    followedBy(endpoint: string, userId: string, pageable?: Pageable): Observable<FollowedByListResponseModel>;
    findFollowedByMatching(endpoint: string, userId: string, name: string, pageable?: Pageable): Observable<FollowedByListResponseModel>;
    followingOne(endpoint: string, userId: string, followedById: string): Observable<FollowedByResponseModel>;
    following(endpoint: string, userId: string, pageable?: Pageable): Observable<FollowingListResponseModel>;
    findFollowingMatching(endpoint: string, userId: string, name: string, pageable?: Pageable): Observable<FollowingListResponseModel>;
    follow(endpoint: string, followReq: FollowRequest): Observable<void>;
    unfollow(endpoint: string, userId: string, userToUnfollow: string): Observable<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<FollowingService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<FollowingService>;
}
