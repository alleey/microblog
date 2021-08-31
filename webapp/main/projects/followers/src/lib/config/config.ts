import { InjectionToken } from '@angular/core';

export interface FollowingServiceConfig {
  serviceBaseUrl: string,
  defaultEndpoint: string,
  pageSize: number,
}
export const FollowingServiceConfigToken = new InjectionToken<FollowingServiceConfig>("FollowingServiceConfig");

export interface FollowersModuleConfig {
  followers: FollowingServiceConfig;
}
export const FollowersModuleConfigToken = new InjectionToken<FollowersModuleConfig>("FollowersModuleConfig");
