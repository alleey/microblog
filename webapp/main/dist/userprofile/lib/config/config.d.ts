import { InjectionToken } from '@angular/core';
export interface UserProfileServiceConfig {
    serviceBaseUrl: string;
    defaultEndpoint: string;
    pageSize: number;
}
export declare const UserProfileServiceConfigToken: InjectionToken<UserProfileServiceConfig>;
export interface UserProfileModuleConfig {
    userProfiles: UserProfileServiceConfig;
}
export declare const UserProfileModuleConfigToken: InjectionToken<UserProfileModuleConfig>;
