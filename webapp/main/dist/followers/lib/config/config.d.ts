import { InjectionToken } from '@angular/core';
export interface FollowingServiceConfig {
    serviceBaseUrl: string;
    defaultEndpoint: string;
    pageSize: number;
}
export declare const FollowingServiceConfigToken: InjectionToken<FollowingServiceConfig>;
export interface FollowersModuleConfig {
    followers: FollowingServiceConfig;
}
export declare const FollowersModuleConfigToken: InjectionToken<FollowersModuleConfig>;
